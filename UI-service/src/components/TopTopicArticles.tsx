import React from 'react';
import { NewsArticleSummary } from '../types/articleTypes';

// Extended interfaces for the article components
interface ArticleProps {
  title: string;
  author: string;
  imageUrl: string;
  link: string;
  sourceInfo: {
    name: string;
    logo: string;
    timeAgo: string;
  };
  className?: string;
}

// Update the article components to use the new props
const MainArticle: React.FC<ArticleProps> = ({ 
  title, 
  author, 
  imageUrl, 
  link, 
  sourceInfo, 
  className 
}) => (
  <div className={`Column-imageDenseModRight md:grow-0 md:shrink-0 md:mb-[35px] md:mr-[30px] md:w-[calc(66.66667%-20px)] ${className}`}>
    <div className='Card-standardBreakerCardMAIN box-border block font-semibold py-[15px] px-0 md:p-0 text-[22px] pb-[9px] pt-0 w-full md:pb-[14px] md:max-h-[422px]'>
      <a href={link} className='group block text-primary-text'>
        <div className='Card-mediaContainer block mb-[15px] relative w-full'>
          <div className='Card-imageContainer relative md:h-[350px] overflow-hidden'>
            <div className='Card-rectangleMediaContainer h-full w-full'>
              <img 
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className='Card-textContent'>
          <div className='Card-titleAndFooter flex flex-col justify-between'>
            <div className='Card-titleContainer overflow-hidden text-ellipsis'>
              <span className='group-hover:underline group-hover:underline-offset-4'>{title}</span>
            </div>
            <div className='Card-cardFooter flex flex-wrap items-center gap-3 my-[15px] mx-0'>
              <img 
                src={sourceInfo.logo} 
                alt={sourceInfo.name} 
                className="h-6 w-6 object-cover rounded-full"
              />
              <span className='text-secondary-text text-[12px] font-semibold'>{author}</span>
              <span className='text-secondary-text text-[12px]'>{sourceInfo.timeAgo}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
);

// SideArticle Component
const SideArticle: React.FC<ArticleProps> = ({ 
  title, 
  author, 
  imageUrl, 
  link, 
  sourceInfo, 
  className 
}) => (
  <div className={`Column-imageDenseModLeft md:mr-0 md:grow-0 md:shrink-0 md:mb-[35px] md:w-[calc(33.33333%-10px)] ${className}`}>
    <div className='Card-standardBreakerCardLEFT border-t border-border-dividers border-dashed md:border-none box-border font-semibold md:p-0 pt-0 flex md:flex-col md:mt-0 pb-[9px] text-[20px] md:max-h-[402px]'>
      <a href={link} className='group text-primary-text'>
        <div className='Card-mediaContainer block relative md:mr-0 md:w-full md:mb-[18px]'>
          <div className='Card-imageContainer md:h-[250px] overflow-hidden'>
            <div className='Card-squareMediaContainer h-full w-full'>
              <img 
                src={imageUrl}
                alt={title}
                className="hidden md:block w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className='Card-textContent flex flex-col mt-4 md:mt-[6px]'>
          <div className='Card-titleAndFooter flex flex-col justify-between grow'>
            <div className='Card-titleContainer overflow-hidden text-ellipsis'>
              <span className='group-hover:underline group-hover:underline-offset-4'>{title}</span>
            </div>
            <div className='Card-cardFooter flex flex-row items-center gap-3 my-[15px] mx-0'>
              <img 
                src={sourceInfo.logo} 
                alt={sourceInfo.name} 
                className="h-6 w-6 object-cover rounded-full"
              />
              <span className='text-secondary-text text-[12px] font-semibold'>{author}</span>
              <span className='text-secondary-text text-[12px]'>{sourceInfo.timeAgo}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
);

// BottomArticle Component
const BottomArticle: React.FC<ArticleProps> = ({ 
  title, 
  author, 
  imageUrl, 
  link, 
  sourceInfo, 
  className 
}) => (
  <div className={`Column-threeUpUltraDense m-0 md:grow-0 md:shrink-0 md:w-[calc(33.33333%-20px)] md:last:mr-0 ${className}`}>
    <div className="Card-standardBreakerCard border-t border-border-dividers border-dashed md:border-none box-border font-semibold py-[15px] px-0 flex flex-row text-[17px] md:flex-col md:mt-0 md:text-[16px]">
      <a href={link} className="group text-primary-text">
        <div className="Card-mediaContainer block relative md:mr-0 md:w-full md:mb-[18px]">
          <div className="Card-imageContainer md:h-[213px] overflow-hidden">
            <div className="Card-squareMediaContainer h-full w-full">
              <img
                src={imageUrl}
                alt={title}
                className="hidden md:block w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="Card-textContent flex flex-col mt-[6px]">
          <div className="Card-titleAndFooter flex flex-col justify-between grow">
            <div className="Card-titleContainer overflow-hidden text-ellipsis">
              <span className="group-hover:underline group-hover:underline-offset-4">{title}</span>
            </div>
            <div className="Card-threeUpCardFooterStyle flex flex-row items-center gap-3 my-[15px] mx-0">
              <img 
                src={sourceInfo.logo} 
                alt={sourceInfo.name} 
                className="h-6 w-6 object-cover rounded-full"
              />
              <span className="text-secondary-text text-[12px] font-semibold">{author}</span>
              <span className="text-secondary-text text-[12px]">{sourceInfo.timeAgo}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
);

interface TopTopicArticlesProps {
  topic: string;
  articles: NewsArticleSummary[];
  accentColor?: string; // For the topic header bar color
}

const TopTopicArticles: React.FC<TopTopicArticlesProps> = ({ 
  topic, 
  articles, 
  accentColor = 'bg-orange-500' // Default color
}) => {
  // Ensure we have at least 5 articles
  if (!articles || articles.length < 5) {
    return null;
  }

  // Destructure articles for different layouts
  const [mainArticle, sideArticle, ...bottomArticles] = articles;

  // Helper function to format article for components
  const formatArticleProps = (article: NewsArticleSummary) => ({
    title: article.title,
    author: article.author || article.source,
    imageUrl: article.imageUrl,
    link: `/article/${encodeURIComponent(article.title)}`, // You might want to use a proper slug or ID here
    sourceInfo: {
      name: article.source,
      logo: article.sourceLogoUrl,
      timeAgo: article.timeAgo
    }
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <header className='border-t-2 border-border-dividers order-1 relative flex-grow'>
        <span className={`${accentColor} block w-[80px] md:w-[110px] h-[6px] left-0 absolute top-[-6px]`}></span>
        <h2 className='color-primary-text text-3xl md:text-4xl font-extrabold mx-0 my-[15px] md:mt-5 uppercase'>
          <a href={`/${topic.toLowerCase()}`}>
            {topic}
          </a>
        </h2>
      </header>

      <div className='SectionWrapper-content w-full block grow order-2 md:order-3'>
        <div className="Layout-layout md:flex md:flex-wrap">
          <MainArticle {...formatArticleProps(mainArticle)} />
          <SideArticle {...formatArticleProps(sideArticle)} />
        </div>
        <div className="Layout-layout md:flex md:flex-wrap md:gap-[30px]">
          {bottomArticles.slice(0, 3).map((article) => (
            <BottomArticle 
              key={article.title} 
              {...formatArticleProps(article)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTopicArticles;