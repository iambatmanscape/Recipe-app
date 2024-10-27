from motor.motor_asyncio import AsyncIOMotorClient,AsyncIOMotorDatabase
from pydantic import BaseModel,Field,root_validator
from bson import ObjectId
from pyobjectID import PyObjectId
from typing import Optional

def connection(uri:str)->AsyncIOMotorDatabase:
    try:
        client = AsyncIOMotorClient(uri)
        db = client['recipe_collection']
        print('Mongodb Connected')
        return db

    except Exception as e:
        print(f"Error while connecting to mongodb {e}")


class RecipeModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    author:str = Field(...)
    cook_time_minutes:int = Field(...)
    description:str = Field(...)
    footnotes:list = Field(...)
    ingredients:list[str] = Field(...)
    instructions:list[str] = Field(...)
    photo_url:Optional[str] = Field(...)
    prep_time_minutes:Optional[int] = Field(...)
    rating_stars:Optional[float] = Field(default=0)
    review_count:Optional[int] = Field(default=0)
    title:str = Field(...)
    total_time_minutes:int = Field(...)

    @root_validator(pre=True)
    def convert_objectid_to_str(cls, values):
        # Check if '_id' is in the dictionary and is an ObjectId, then convert to str
        if "_id" in values and isinstance(values["_id"], ObjectId):
            values["_id"] = str(values["_id"])
        return values

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "author": "Stephanie",
                "cook_time_minutes": 25,
                "description": "I just started adding my favorite things to basic cornbread and I came up with something great!",
                "footnotes": [],
                "ingredients": [
                    "1/2 cup unsalted butter, chilled and cubed",
                    "1 cup chopped onion",
                    "1 3/4 cups cornmeal",
                    "1 1/4 cups all-purpose flour",
                    "1/4 cup white sugar",
                    "1 tablespoon baking powder",
                    "1 1/2 teaspoons salt",
                    "1/2 teaspoon baking soda",
                    "1 1/2 cups buttermilk",
                    "3 eggs",
                    "1 1/2 cups shredded pepperjack cheese",
                    "1 1/3 cups frozen corn kernels, thawed and drained",
                    "2 ounces roasted marinated red bell peppers, drained and chopped",
                    "1/2 cup chopped fresh basil"
                ],
                "instructions": [
                    "Preheat oven to 400 degrees F (205 degrees C). Butter a 9x9x2 inch baking pan.",
                    "Melt 1 tablespoon butter in medium nonstick skillet over medium-low heat. Add onion and saute until tender, about 10 minutes. Cool.",
                    "Mix cornmeal with the flour, baking powder, sugar, salt, and baking soda in large bowl. Add 7 tablespoons butter and rub with fingertips until mixture resembles coarse meal.",
                    "Whisk buttermilk and eggs in medium bowl to blend. Add buttermilk mixture to dry ingredients and stir until blended. Mix in cheese, corn, red peppers, basil, and onion. Transfer to prepared pan.",
                    "Bake cornbread until golden and tester inserted comes out clean, about 45 minutes. Cool 20 minutes in pan. Cut cornbread into squares."
                ],
                "photo_url": "http://images.media-allrecipes.com/userphotos/560x315/582853.jpg",
                "prep_time_minutes": 55,
                "rating_stars": 4.32,
                "review_count": 46,
                "title": "Basil, Roasted Peppers and Monterey Jack Cornbread",
                "total_time_minutes": 100,
            }
        }

