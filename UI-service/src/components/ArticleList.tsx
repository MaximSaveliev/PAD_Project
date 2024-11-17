import { NewsArticleSummary } from "../types/articleTypes";

// Define colors for badges
const BADGE_COLORS: Record<string, string> = {
  Politics: "badge-sm bg-politics-color/10 text-politics-color ring-politics-color",
  Business: "badge-sm bg-business-color/10 text-business-color ring-business-color",
  Technology: "badge-sm bg-technology-color/10 text-technology-color ring-technology-color",
  Health: "badge-sm bg-health-color/10 text-health-color ring-health-color",
  Science: "badge-sm bg-science-color/10 text-science-color ring-science-color",
  Entertainment: "badge-sm bg-entertainment-color/10 text-entertainment-color ring-entertainment-color",
  Sports: "badge-sm bg-sports-color/10 text-sports-color ring-sports-color",
  World: "badge-sm bg-world-color/10 text-world-color ring-world-color",
  Opinion: "badge-sm bg-opinion-color/10 text-opinion-color ring-opinion-color",
};

// Utility function for random color generation (excluding black and white)
const getRandomColor = () => {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  console.log(randomR, randomG, randomB);

  return `badge-sm bg-[rgb(${randomR},${randomG},${randomB})]/10 text-[rgb(${randomR},${randomG},${randomB})] ring-[rgb(${randomR},${randomG},${randomB})]`;
};


interface ArticleListProps {
  topic: string;
}

const ArticleList = ({ topic }: ArticleListProps) => {
  // Hardcoded example data
  const mockArticles: NewsArticleSummary[] = [
    {
      id: "1",
      title: "AI Revolutionizes Healthcare with Breakthrough Diagnoses",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 16TH 2024",
      timeAgo: "2 hours ago",
      imageUrl: 'https://image.cnbcfm.com/api/v1/image/108062352-17315148152024-11-13t160658z_1910791073_rc2f4barxuf7_rtrmadp_0_usa-trump-congress.jpeg?v=1731514981&w=1480&h=833&ffmt=webp&vtcrop=y',
      topics: ["AI", "Healthcare", "Innovation"],
      badges: ["Breaking News", "Top Story", "Politics", "Health", "Technology", "Business", "Top News"],
      author: "Dr. Emily Thompson",
      source: "TechCrunch",
      sourceLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png"
    },
    {
      id: "2",
      title: "AI Revolutionizes Healthcare with Breakthrough Diagnoses",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 16TH 2024",
      timeAgo: "2 hours ago",
      imageUrl: 'https://image.cnbcfm.com/api/v1/image/108062352-17315148152024-11-13t160658z_1910791073_rc2f4barxuf7_rtrmadp_0_usa-trump-congress.jpeg?v=1731514981&w=1480&h=833&ffmt=webp&vtcrop=y',
      topics: ["AI", "Healthcare", "Innovation"],
      badges: ["Politics", "Technology", "Business"],
      author: "Dr. Emily Thompson",
      source: "TechCrunch",
      sourceLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png"
    },
    {
      id: "3",
      title: "AI Revolutionizes Healthcare with Breakthrough Diagnoses",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 16TH 2024",
      timeAgo: "2 hours ago",
      imageUrl: 'https://image.cnbcfm.com/api/v1/image/108062352-17315148152024-11-13t160658z_1910791073_rc2f4barxuf7_rtrmadp_0_usa-trump-congress.jpeg?v=1731514981&w=1480&h=833&ffmt=webp&vtcrop=y',
      topics: ["AI", "Healthcare", "Innovation"],
      badges: ["Politics", "Breaking News", "Business"],
      author: "Dr. Emily Thompson",
      source: "TechCrunch",
      sourceLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png"
    },
  ];

  return (
    <section className="max-w-[1000px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Articles on {topic}</h2>
      <div className="grid grid-cols-1 gap-6">
        {mockArticles.map((article) => (
          <a href={`/article/${encodeURIComponent(article.title)}`} className="group">
            <div
              key={article.id}
              className="grid grid-cols-1 md:grid-cols-3 py-3 gap-4 border-b border-border-dividers"
            >
              {/* Left: Content */}
              <div className="flex flex-col justify-between col-span-2 order-last md:order-first">
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(article.badges ?? []).map((badge) => {
                      const badgeStyle = BADGE_COLORS[badge] || getRandomColor();
                      return (
                        <span
                          key={badge}
                          className={`${badgeStyle}`}
                        >
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:underline group-hover:underline-offset-3">{article.title}</h3>
                  <p className="text-secondary-text mt-2">{article.description}</p>
                </div>
                <div className="flex gap-2 mt-4 items-center">
                  <img src={article.sourceLogoUrl} alt={article.source} className="w-6 h-6 rounded-full" />
                  <p className="text-sm text-secondary-text"> {article.source} | {article.timeAgo}</p>
                </div>
              </div>
              {/* Right: Image */}
              <div className="w-full">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover md:max-w-[350px]"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ArticleList;
