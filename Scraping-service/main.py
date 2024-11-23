from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to scrape CNN
def scrape_cnn():
    url = "https://search.prod.di.api.cnn.io/content?q=&size=10&from=0&page=1&sort=newest&request_id=pdx-search-3e989e79-c290-4114-bbc0-66c1d091a2ef"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract the news titles from the search result
    news_items = []
    for item in soup.select('span.container__headline-text'):
        title = item.get_text(strip=True)
        news_items.append(title)

    return news_items

# Endpoint to trigger the scraper
@app.post("/trigger-scraper")
async def trigger_scraper():
    # Perform the scraping and return the scraped data
    scraped_data = scrape_cnn()
    return {"news": scraped_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


    
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
