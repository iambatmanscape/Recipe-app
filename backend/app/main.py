from fastapi import FastAPI,Query,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from .database.mongodb import connection,RecipeModel,RecipesModel
from dotenv import load_dotenv
from typing import List
from bson import ObjectId
from os import getenv
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


db = connection(getenv('MONGODB_STRING'))
recipes = db['recipes']


@app.get('/recipes',response_model=List[RecipesModel])
async def get_recipes(skip:int = Query(0,ge=0),limit:int = Query(10,ge=1,le=20)):
    recipe_list = []
    cursor = recipes.find({},projection={"author":1,"photo_url":1,"title":1,"rating_stars":1}).skip(skip).limit(limit)
    async for recipe in cursor:
        recipe_list.append(recipe)
    return recipe_list

@app.get('/recipes/getbyname/{recipe_query}',response_model=List[RecipesModel])
async def get_recipe(recipe_query:str,skip:int = Query(0,ge=0),limit:int = Query(10,ge=1,le=20)):
    recipe_list = []
    cursor = recipes.find({"title": {"$regex": recipe_query, "$options": "i"}},projection={"author":1,"photo_url":1,"title":1,"rating_stars":1}).skip(skip).limit(limit)
    async for recipe in cursor:
        recipe_list.append(recipe)
    return recipe_list

@app.get('/recipes/getbyid/{recipe_id}',response_model=RecipeModel)
async def get_recipe(recipe_id:str):
    recipe = await recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe is None:  # Handle not found case
        raise HTTPException(status_code=404, detail="Recipe not found")

    return recipe

