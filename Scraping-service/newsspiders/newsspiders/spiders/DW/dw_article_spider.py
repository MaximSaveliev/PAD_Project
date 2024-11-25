import scrapy
import json
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule


class DWSpider(CrawlSpider):
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

    # Rules to follow links within the same domain and pagination links
    rules = (
        Rule(
            LinkExtractor(allow=(r"/en/.*?/s-\d+$"), restrict_css=".pagination"), 
            callback="parse_category", 
            follow=True
        ),
    )

    def parse_start_url(self, response):
        """Initial handler for each category page."""
        return self.parse_category(response)

    def parse_category(self, response):
        """Parse articles in the category page and extract API URL if available."""
        api_url = self.extract_api_url(response)
        if api_url:
            yield scrapy.Request(
                url=response.urljoin(api_url),
                callback=self.parse_api_response,
                meta={'category': response.url}
            )

    def extract_api_url(self, response):
        """Extract API URL dynamically."""
        try:
            # Example of extracting API URL dynamically (Update the selector based on actual page structure)
            script = response.xpath("//script[contains(text(), 'graph-api')]/text()").get()
            api_url = json.loads(script).get('navigationApiPath', None)
            return api_url
        except Exception as e:
            self.logger.error(f"Failed to extract API URL: {e}")
            return None

    def parse_api_response(self, response):
        """Parse JSON response from API."""
        try:
            data = json.loads(response.body)
            articles = data.get("data", {}).get("content", {}).get("contentComposition", {}).get(
                "informationSpaces", {}
            ).get("stories_list_region", {}).get("contents", [])

            for article in articles:
                item = {
                    'category': response.meta.get('category'),
                    'namedUrl': article.get("namedUrl"),
                    'title': article.get("title"),
                    'shortTeaser': article.get("shortTeaser"),
                    'teaser': article.get("teaser"),
                    'mainContentImageLink': self.get_image_url(article)
                }
                yield item
        except Exception as e:
            self.logger.error(f"Error parsing API response: {e}")

    def get_image_url(self, article):
        """Extract and format image URL."""
        image_data = article.get("mainContentImageLink", {}).get("target", {})
        static_url = image_data.get("staticUrl", "")
        return static_url.replace("${formatId}", "101") if static_url else None
