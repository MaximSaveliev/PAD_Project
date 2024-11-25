from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime


class NewsArticleItem(BaseModel):
    article: str
    preview: str
    headline: str
    lastModifiedDate: datetime
    provider: str
    provider_logo: HttpUrl
    thumbnail: Optional[HttpUrl]
    topic: str
    url: HttpUrl
    created: datetime
    author: str
    tts_uid: Optional[str]
