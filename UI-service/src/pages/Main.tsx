import React, { useContext } from 'react'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import { ThemeContext } from '../context/ThemeContext';
import NewsPartners from '../components/NewsPartners';
import TopTopicArticles from '../components/TopTopicArticles';

const Main = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Hero></Hero>
      <TopTopicArticles></TopTopicArticles>
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