from fastapi import FastAPI, HTTPException
from models import NewsArticleItem
from services import NewsService

app = FastAPI()


@app.post("/articles/", response_model=dict)
def create_article(article: NewsArticleItem):
    """Create a new article."""
    article_id = NewsService.create_article(article)
    return {"article_id": article_id}


@app.get("/articles/{article_id}", response_model=NewsArticleItem)
def get_article(article_id: str):
    """Get an article by ID."""
    article = NewsService.get_article(article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


@app.put("/articles/{article_id}", response_model=dict)
def update_article(article_id: str, article: NewsArticleItem):
    """Update an article."""
    success = NewsService.update_article(article_id, article.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article updated successfully"}


@app.delete("/articles/{article_id}", response_model=dict)
def delete_article(article_id: str):
    """Delete an article."""
    success = NewsService.delete_article(article_id)
    if not success:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted successfully"}


@app.get("/articles/", response_model=list)
def list_articles():
    """List all articles."""
    return NewsService.list_articles()
