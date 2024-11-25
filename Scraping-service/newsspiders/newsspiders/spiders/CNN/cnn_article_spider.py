import json
import scrapy
from newsspiders.items import NewsArticleItem
from scrapy.selector import Selector
import random  # For selecting a random proxy

class CnnSpider(scrapy.Spider):
    name = "cnn"
    allowed_domains = ["cnn.com", "search.prod.di.api.cnn.io"]

    topics = {
        "world": "https://search.prod.di.api.cnn.io/content?q=&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "politics": "https://search.prod.di.api.cnn.io/content?q=politics&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "technology": "https://search.prod.di.api.cnn.io/content?q=technology&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "sports": "https://search.prod.di.api.cnn.io/content?q=sports&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "business": "https://search.prod.di.api.cnn.io/content?q=business&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "health": "https://search.prod.di.api.cnn.io/content?q=health&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "science": "https://search.prod.di.api.cnn.io/content?q=science&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "entertainment": "https://search.prod.di.api.cnn.io/content?q=entertainment&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
        "opinion": "https://search.prod.di.api.cnn.io/content?q=opinion&size=100&from=0&page={}&sort=newest&request_id=pdx-search-c346b73c-9fdd-478d-8717-16a501589e89",
    }

    def start_requests(self):
        headers = {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8,ro-RO;q=0.7,ro;q=0.6",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "referrer": "https://edition.cnn.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
        }  

        for topic, url in self.topics.items():
            yield scrapy.Request(
                url=url.format(1),
                callback=self.parse,
                cb_kwargs={'topic': topic, 'page': 1},
                headers=headers,
            )

    def parse(self, response, topic, page):
        data = json.loads(response.text)
        if data.get("message") == "success":
            for article in data.get("result", []):
                if article.get("type") == "NewsArticle":
                    item = NewsArticleItem(
                        url=article.get("url"),
                        headline=article.get("headline"),
                        topic=topic,
                        thumbnail=article.get("thumbnail"),
                        lastModifiedDate=article.get("lastModifiedDate"),
                        preview=article.get("body")[:200],
                        provider="CNN",
                        provider_logo="https://edition.cnn.com/wbdotp/consent/3d9a6f21-8e47-43f8-8e24-cc481c440166/logos/9651e1f6-c35b-4377-be7f-5a0c93f0ecb8/fd2c628a-153d-49d4-b7b4-92a834c64b28/507420f5-a79f-4038-baea-bb890032307c/CNN_logo.png",
                        created=article.get("lastModifiedDate"),
                        author=article.get("author", ""),
                        tts_uid="",  
                        article="",
                    )
                    # Make a request to the article URL to fetch full content
                    yield scrapy.Request(
                        url=article.get("url"),
                        callback=self.parse_item,
                        meta={'item': item }  # Pass the proxy along to the next request
                    )

            # Pagination handling
            if page < 5:
                next_page = page + 1
                next_url = self.topics[topic].format(next_page)
                yield scrapy.Request(
                    url=next_url,
                    callback=self.parse,
                    cb_kwargs={'topic': topic, 'page': next_page}  # Pass the proxy along to the next request
                )

    def parse_item(self, response):
        item = response.meta['item']
        selector = Selector(response)
        
        # Extract paragraphs with the class 'paragraph'
        paragraphs = selector.css('p.paragraph.inline-placeholder.vossi-paragraph')
        
        full_text = ""
        for paragraph in paragraphs:
            # Reformat the paragraph to match the required format
            text = paragraph.get()
            text = text.replace('class="paragraph inline-placeholder vossi-paragraph"', 'class="text-primary-text text-base"')
            full_text += text

        # Update the 'article' field in the item with the modified paragraphs
        item['article'] = full_text

        yield item
