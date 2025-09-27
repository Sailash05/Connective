from pydantic import BaseModel
from typing import List

class Rating(BaseModel):
    postId: str
    rating: float

class Post(BaseModel):
    postId: str
    content: str
    tags: List[str]

class RecommendationRequest(BaseModel):
    ratings: List[Rating]
    posts: List[Post]
