export interface NewsArticleSummary {
    title: string;
    date: string;
    timeAgo: string;
    imageUrl: string;
    topics: string[];
    author?: string;
    source: string;
    sourceLogoUrl: string;
  }
  
  export interface NewsArticleDetails extends NewsArticleSummary {
    articleText: string;
  }
  