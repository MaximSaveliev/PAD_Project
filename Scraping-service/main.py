import scrapy
import json


class DWSpider(scrapy.Spider):
    name = "dw_spider"
    
    # Define start URLs based on categories
    start_urls = [
        'https://www.dw.com/en/science/s-12526',
        'https://www.dw.com/en/business/s-1431',
        'https://www.dw.com/en/environment/s-11798',
        'https://www.dw.com/en/sport/s-8171',
        'https://www.dw.com/en/europe/s-1433',
        'https://www.dw.com/en/asia/s-12758',
        'https://www.dw.com/en/north-america/s-58267502'
    ]

    def parse(self, response):
        # Assuming the JSON data is embedded within the page or is available via an API call
        api_url = "/graph-api/en/content/navigation/58267502"
        yield scrapy.Request(
            url=api_url,
            callback=self.parse_api_response
        )

    def parse_api_response(self, response):
        data = json.loads(response.body)
        articles = data.get("data", {}).get("content", {}).get("contentComposition", {}).get("informationSpaces", {}).get("stories_list_region", {}).get("contents", [])

        for article in articles:
            item = {
                'namedUrl': article.get("namedUrl"),
                'title': article.get("title"),
                'shortTeaser': article.get("shortTeaser"),
                'teaser': article.get("teaser"),
                'mainContentImageLink': article.get("mainContentImageLink", {}).get("target", {}).get("staticUrl", "").replace("${formatId}", "101")
            }
            yield item
