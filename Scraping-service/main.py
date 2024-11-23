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
