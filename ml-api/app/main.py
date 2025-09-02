from fastapi import FastAPI
from app.schemas import RecommendationRequest
from app.recommender import recommend_posts

app = FastAPI()

@app.post("/recommend")
def recommend(data: RecommendationRequest):
    recommendations = recommend_posts(data.ratings, data.posts, top_n=50)
    return {"recommendations": recommendations}
