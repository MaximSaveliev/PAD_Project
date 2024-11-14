import React, { useContext } from 'react'
import Hero from '../components/Hero'
import ArticleCard from '../components/ArticleCard'
import { ThemeContext } from '../context/ThemeContext';
import NewsPartners from '../components/NewsPartners';
import TopTopicArticles from '../components/TopTopicArticles';

const articles = [
  {
    title: "Bitcoin hits $80,000 for the first time as crypto traders bask in Trump election victory",
    author: "Tanaya Macheel",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681312953146-7eb5f41f7994?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Fintechs Upstart and Toast soar on earnings",
    author: "MacKenzie Sigalos",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681312953146-7eb5f41f7994?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Tesla's social media posts falsely implied that its cars are robotaxis, NHTSA warns",
    author: "Lora Kolodny",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681312953146-7eb5f41f7994?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "OpenAI blocked 250,000 image generations of presidential candidates",
    author: "Hayden Field",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681312953146-7eb5f41f7994?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Jack Dorsey dramatically scales back crypto ambitions for Block",
    author: "Ari Levy",
    timeAgo: "4 HOURS AGO",
    imageUrl: "https://plus.unsplash.com/premium_photo-1681312953146-7eb5f41f7994?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

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