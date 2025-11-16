from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .database.mongodb import connection, RecipeModel, RecipesModel
from dotenv import load_dotenv
from typing import List, Dict, Any
from bson import ObjectId
from os import getenv
import logging

# configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

FRONTEND_URL = getenv("FRONTEND_URL")

if not FRONTEND_URL:
    FRONTEND_URL = "http://localhost:5173"

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# establish DB connection
try:
    db = connection(getenv("MONGODB_STRING"))
    recipes = db["recipes"]
except Exception as e:
    # If connection fails at import time, log — endpoints will raise 500.
    logger.exception("Failed to connect to MongoDB during startup.")
    db = None
    recipes = None


def _stringify_objectid(doc: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert ObjectId in document to string for JSON/Pydantic compatibility.
    Returns a shallow copy (does not deep-convert nested ObjectIds).
    """
    if not doc:
        return doc
    doc_copy = dict(doc)
    _id = doc_copy.get("_id")
    if isinstance(_id, ObjectId):
        doc_copy["_id"] = str(_id)
    return doc_copy


@app.get("/recipes", response_model=List[RecipesModel])
async def get_recipes(skip: int = Query(0, ge=0), limit: int = Query(10, ge=1, le=20)):
    if recipes is None:
        logger.error("Database not initialized.")
        raise HTTPException(status_code=500, detail="Database connection not available")

    recipe_list = []
    try:
        cursor = recipes.find(
            {},
            projection={"author": 1, "photo_url": 1, "title": 1, "rating_stars": 1},
        ).skip(skip).limit(limit)

        async for recipe in cursor:
            recipe_list.append(_stringify_objectid(recipe))

        return recipe_list

    except Exception as e:
        logger.exception("Error while fetching recipes.")
        # avoid leaking internal details
        raise HTTPException(status_code=500, detail="Failed to fetch recipes")


@app.get("/recipes/getbyname/{recipe_query}", response_model=List[RecipesModel])
async def get_recipe_by_name(recipe_query: str, skip: int = Query(0, ge=0), limit: int = Query(10, ge=1, le=20)):
    if recipes is None:
        logger.error("Database not initialized.")
        raise HTTPException(status_code=500, detail="Database connection not available")

    recipe_list = []
    try:
        cursor = recipes.find(
            {"title": {"$regex": recipe_query, "$options": "i"}},
            projection={"author": 1, "photo_url": 1, "title": 1, "rating_stars": 1},
        ).skip(skip).limit(limit)

        async for recipe in cursor:
            recipe_list.append(_stringify_objectid(recipe))

        return recipe_list

    except Exception:
        logger.exception("Error while searching recipes by name: %s", recipe_query)
        raise HTTPException(status_code=500, detail="Failed to search recipes")


@app.get("/recipes/getbyid/{recipe_id}", response_model=RecipeModel)
async def get_recipe_by_id(recipe_id: str):
    if recipes is None:
        logger.error("Database not initialized.")
        raise HTTPException(status_code=500, detail="Database connection not available")

    try:
        obj_id = ObjectId(recipe_id)
    except Exception:
        logger.warning("Invalid ObjectId provided: %s", recipe_id)
        raise HTTPException(status_code=400, detail="Invalid recipe id")

    try:
        recipe = await recipes.find_one({"_id": obj_id})
    except Exception:
        logger.exception("Database error while fetching recipe with id: %s", recipe_id)
        raise HTTPException(status_code=500, detail="Failed to fetch recipe")

    if recipe is None:
        logger.info("Recipe not found: %s", recipe_id)
        raise HTTPException(status_code=404, detail="Recipe not found")

    return _stringify_objectid(recipe)


