import React, { useContext } from 'react'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import { ThemeContext } from '../context/ThemeContext';
import NewsPartners from '../components/NewsPartners';
import TopTopicArticles from '../components/TopTopicArticles';
import { NewsArticleSummary } from '../types/articleTypes';
import ArticleList from '../components/ArticleList';

const techArticles: NewsArticleSummary[] = [
    {
      id: "1",
      title: "AI Revolutionizes Healthcare with Breakthrough Diagnoses",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 16TH 2024",
      timeAgo: "2 hours ago",
      imageUrl: "https://image.cnbcfm.com/api/v1/image/107250893-1685971300256-gettyimages-1258378086-AFP_33GU4HB.jpeg?v=1731694919&w=1260&h=630&ffmt=webp&vtcrop=yy",
      topics: ["AI", "Healthcare", "Innovation"],
      author: "Dr. Emily Thompson",
      source: "TechCrunch",
      sourceLogoUrl: "https://i.pinimg.com/736x/97/7a/31/977a31b32c998dda750cea2db6a7ebf7.jpg"
    },
    {
      id: "2",
      title: "Global Stock Markets Rally Amid Economic Optimism",
      description: "AI technologies are revolutionizing the technology industry, enabling faster innovation and automation.",
      date: "NOV 15TH 2024",
      timeAgo: "1 day ago",
      imageUrl: "https://image.cnbcfm.com/api/v1/image/107250893-1685971300256-gettyimages-1258378086-AFP_33GU4HB.jpeg?v=1731694919&w=1260&h=630&ffmt=webp&vtcrop=yy",
      topics: ["Finance", "Economy", "Markets"],
      author: "Michael Carter",
      source: "Bloomberg",
      sourceLogoUrl: "https://e7.pngegg.com/pngimages/727/671/png-clipart-bloomberg-round-logo-icons-logos-emojis-iconic-brands-thumbnail.png"
    },
    {
      id: "3",
      title: "SpaceX Prepares for Landmark Mars Mission Launch",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 14TH 2024",
      timeAgo: "2 days ago",
      imageUrl: "https://image.cnbcfm.com/api/v1/image/107250893-1685971300256-gettyimages-1258378086-AFP_33GU4HB.jpeg?v=1731694919&w=1260&h=630&ffmt=webp&vtcrop=yy",
      topics: ["Space", "Technology", "Innovation"],
      source: "NASA News",
      sourceLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png"
    },
    {
      id: "4",
      title: "Electric Vehicles Dominate Global Auto Sales in 2024",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 13TH 2024",
      timeAgo: "3 days ago",
      imageUrl: "https://image.cnbcfm.com/api/v1/image/107250893-1685971300256-gettyimages-1258378086-AFP_33GU4HB.jpeg?v=1731694919&w=1260&h=630&ffmt=webp&vtcrop=yy",
      topics: ["EVs", "Automotive", "Sustainability"],
      author: "Sarah Johnson",
      source: "The Wall Street Journal",
      sourceLogoUrl: "https://avatars.githubusercontent.com/u/15697446?s=280&v=4"
    },
    {
      id: "5",
      title: "World Cup Fever: Fans Gear Up for the 2024 Tournament",
      description: "Scientists have made significant strides in quantum computing, promising faster and more secure solutions.",
      date: "NOV 12TH 2024",
      timeAgo: "4 days ago",
      imageUrl: "https://image.cnbcfm.com/api/v1/image/107250893-1685971300256-gettyimages-1258378086-AFP_33GU4HB.jpeg?v=1731694919&w=1260&h=630&ffmt=webp&vtcrop=yy",
      topics: ["Sports", "Football", "Events"],
      source: "ESPN",
      sourceLogoUrl: "https://i0.wp.com/creativeaudiolab.com/wp-content/uploads/2014/10/espn-logo-square1.jpg?fit=300%2C300&ssl=1"
    }
];

const Main = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Hero></Hero>
      <TopTopicArticles 
      topic="Tech"
      articles={techArticles}
      accentColor="bg-technology-color"></TopTopicArticles>
      <ArticleList topic="Technology"></ArticleList>
      <ArticleCard></ArticleCard>
      <NewsPartners></NewsPartners>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <div className='bg-background p-3 flex flex-wrap gap-3 justify-center'>
        <div className='badge bg-politics-color/10 text-politics-color ring-politics-color'>Politics</div>
        <div className='badge bg-business-color/10 text-business-color ring-business-color'>Business</div>
        <div className='badge bg-technology-color/10 text-technology-color ring-technology-color'>Technology</div>
        <div className='badge bg-health-color/10 text-health-color ring-health-color'>Health</div>
        <div className='badge bg-science-color/10 text-science-color ring-science-color'>Science</div>
        <div className='badge bg-entertainment-color/10 text-entertainment-color ring-entertainment-color'>Entertainment</div>
        <div className='badge bg-sports-color/10 text-sports-color ring-sports-color'>Sports</div>
        <div className='badge bg-world-color/10 text-world-color ring-world'>World</div>
        <div className='badge bg-opinion-color/10 text-opinion-color ring-opinion-color'>Opinion</div>
      </div>
      <div>Main</div>
    </>
  )
}

export default Main