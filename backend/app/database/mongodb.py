from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pydantic import BaseModel, Field, model_validator, field_validator, ConfigDict
from bson import ObjectId
from typing import Optional, List

def connection(uri: str) -> AsyncIOMotorDatabase:
    try:
        client = AsyncIOMotorClient(uri)
        db = client['recipe_collection']
        print('Mongodb Connected')
        return db
    except Exception as e:
        print(f"Error while connecting to mongodb {e}")

class RecipeModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        # Example moved to a separate variable for clarity
        json_schema_extra={
            "example": {
                "author": "Stephanie",
                "cook_time_minutes": 25,
                "description": "I just started adding my favorite things to basic cornbread and I came up with something great!",
                "footnotes": [],
                "ingredients": [
                    "1/2 cup unsalted butter, chilled and cubed",
                    "1 cup chopped onion"
                ],
                "instructions": [
                    "Preheat oven to 400 degrees F (205 degrees C).",
                    "Butter a 9x9x2 inch baking pan."
                ],
                "photo_url": "http://images.media-allrecipes.com/userphotos/560x315/582853.jpg",
                "prep_time_minutes": 55,
                "rating_stars": 4.32,
                "review_count": 46,
                "title": "Basil, Roasted Peppers and Monterey Jack Cornbread",
                "total_time_minutes": 100
            }
        }
    )

    id: Optional[str] = Field(default=None, alias="_id")
    author: str = Field(...)
    cook_time_minutes: int = Field(...)
    description: str = Field(...)
    footnotes: List[str] = Field(default_factory=list)
    ingredients: List[str] = Field(...)
    instructions: List[str] = Field(...)
    photo_url: Optional[str] = Field(default=None)
    prep_time_minutes: Optional[int] = Field(default=None)
    rating_stars: float = Field(default=0)
    review_count: int = Field(default=0)
    title: str = Field(...)
    total_time_minutes: int = Field(...)

    # Replace root_validator with model_validator
    @model_validator(mode='before')
    @classmethod
    def convert_objectid(cls, data: dict) -> dict:
        """Convert ObjectId to string if present"""
        if isinstance(data.get("_id"), ObjectId):
            data["_id"] = str(data["_id"])
        return data

    # Add field-level validators for additional validation
    @field_validator('cook_time_minutes', 'prep_time_minutes', 'total_time_minutes')
    @classmethod
    def validate_time_values(cls, v: int, info) -> int:
        if v is not None and v < 0:
            raise ValueError(f"{info.field_name} cannot be negative")
        return v

    @field_validator('rating_stars')
    @classmethod
    def validate_rating(cls, v: float) -> float:
        if v < 0 or v > 5:
            raise ValueError("Rating must be between 0 and 5")
        return round(v, 2)  # Round to 2 decimal places

    @field_validator('ingredients', 'instructions')
    @classmethod
    def validate_list_not_empty(cls, v: List[str], info) -> List[str]:
        if not v:
            raise ValueError(f"{info.field_name} cannot be empty")
        return v

    @field_validator('photo_url')
    @classmethod
    def validate_photo_url(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not v.startswith(('http://', 'https://')):
            raise ValueError("Photo URL must start with http:// or https://")
        return v

    # Custom method to convert model to dict for MongoDB
    def to_mongo(self) -> dict:
        """Convert model to MongoDB-compatible dict"""
        data = self.model_dump(by_alias=True, exclude_none=True)
        # Convert string ID back to ObjectId if it exists
        if data.get("_id"):
            data["_id"] = ObjectId(data["_id"])
        return data


class RecipesModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        # Example moved to a separate variable for clarity
        json_schema_extra={
            "example": {
                "author": "Stephanie",
                "photo_url": "http://images.media-allrecipes.com/userphotos/560x315/582853.jpg",
                "rating_stars": 4.32,
                "title": "Basil, Roasted Peppers and Monterey Jack Cornbread"
            }
        }
    )

    id: Optional[str] = Field(default=None, alias="_id")
    author: str = Field(...)
    photo_url: Optional[str] = Field(default=None)
    rating_stars: float = Field(default=0)
    title: str = Field(...)

    # Replace root_validator with model_validator
    @model_validator(mode='before')
    @classmethod
    def convert_objectid(cls, data: dict) -> dict:
        """Convert ObjectId to string if present"""
        if isinstance(data.get("_id"), ObjectId):
            data["_id"] = str(data["_id"])
        return data

    
    @field_validator('rating_stars')
    @classmethod
    def validate_rating(cls, v: float) -> float:
        if v < 0 or v > 5:
            raise ValueError("Rating must be between 0 and 5")
        return round(v, 2)  # Round to 2 decimal places

    
    @field_validator('photo_url')
    @classmethod
    def validate_photo_url(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and not v.startswith(('http://', 'https://')):
            raise ValueError("Photo URL must start with http:// or https://")
        return v

    # Custom method to convert model to dict for MongoDB
    def to_mongo(self) -> dict:
        """Convert model to MongoDB-compatible dict"""
        data = self.model_dump(by_alias=True, exclude_none=True)
        # Convert string ID back to ObjectId if it exists
        if data.get("_id"):
            data["_id"] = ObjectId(data["_id"])
        return data