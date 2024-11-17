export interface NewsArticleSummary {
    id: string;
    title: string;
    description?: string;
    date: string;
    timeAgo: string;
    imageUrl: string;
    topics: string[];
    badges?: string[];
    author?: string;
    source: string;
    sourceLogoUrl: string;
  }
  
  export interface NewsArticleDetails extends NewsArticleSummary {
    articleText: string;
  }
  