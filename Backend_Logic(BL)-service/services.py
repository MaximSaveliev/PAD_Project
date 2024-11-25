from config import db
from models import NewsArticleItem
from typing import Optional
import uuid

COLLECTION_NAME = "cnn_news"


class NewsService:
    @staticmethod
    def create_article(article: NewsArticleItem) -> str:
        article_id = str(uuid.uuid4())  # Generate unique ID
        db.collection(COLLECTION_NAME).document(article_id).set(article.dict())
        return article_id

    @staticmethod
    def get_article(article_id: str) -> Optional[dict]:
        doc = db.collection(COLLECTION_NAME).document(article_id).get()
        if doc.exists:
            return doc.to_dict()
        return None

    @staticmethod
    def update_article(article_id: str, updated_data: dict) -> bool:
        doc_ref = db.collection(COLLECTION_NAME).document(article_id)
        if doc_ref.get().exists:
            doc_ref.update(updated_data)
            return True
        return False

    @staticmethod
    def delete_article(article_id: str) -> bool:
        doc_ref = db.collection(COLLECTION_NAME).document(article_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return True
        return False

    @staticmethod
    def list_articles() -> list:
        articles = db.collection(COLLECTION_NAME).stream()
        return [doc.to_dict() for doc in articles]
