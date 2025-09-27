from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def recommend_posts(ratings, posts, top_n=10):
    # Convert posts to DataFrame
    df = pd.DataFrame([{
        "postId": p.postId,
        "text": f"{p.content} {' '.join(p.tags)}"
    } for p in posts])

    # TF-IDF vectorization
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(df["text"])

    # Cosine similarity matrix (post-to-post similarity)
    cosine_sim = cosine_similarity(tfidf_matrix)

    # Map postId to index
    post_idx = {pid: idx for idx, pid in enumerate(df["postId"])}

    # Score other posts based on user ratings
    scores = {}
    for r in ratings:
        if r.postId not in post_idx:
            continue
        idx = post_idx[r.postId]
        sim_scores = cosine_sim[idx]
        for i, sim in enumerate(sim_scores):
            if i == idx:
                continue  # Skip same post
            scores[i] = scores.get(i, 0) + sim * r.rating

    # Rank posts by score
    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)

    # Get top post IDs
    recommended_ids = [df.iloc[i]["postId"] for i, _ in ranked[:top_n]]
    return recommended_ids
