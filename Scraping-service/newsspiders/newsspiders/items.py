import scrapy

class NewsArticleItem(scrapy.Item):
    article = scrapy.Field()
    preview = scrapy.Field()
    headline = scrapy.Field()
    lastModifiedDate = scrapy.Field()
    provider = scrapy.Field()
    provider_logo = scrapy.Field()
    thumbnail = scrapy.Field()
    topic = scrapy.Field()
    url = scrapy.Field()
    created = scrapy.Field()
    author = scrapy.Field()
    tts_uid = scrapy.Field()
