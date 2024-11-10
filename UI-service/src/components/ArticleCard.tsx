import React from 'react'

interface Article {
  id: number
  image: string
  title: string
  time: string
  logo: string
  trending: boolean
}

const articles: Article[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Protests Erupt Across Israel After Netanyahu Fires Defense Minister',
    time: '15h',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    trending: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    trending: false
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    trending: false
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    trending: false
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    trending: false
  },
  // Add more articles here...
]

const ArticleCard: React.FC<Article> = ({ image, title, time, logo, trending }) => {
  return (
    <div className="text-primary-text bg-secondary-background rounded-lg overflow-hidden max-w-xs mx-auto my-4 relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between text-primary-text text-sm mb-2">
          <img src={logo} alt="Source Logo" className="w-8 h-8 rounded-full" />
          <div className="flex items-center">
          <i className="text-primary-text fa-regular fa-clock pr-1"></i>
            <span>{time}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-left">{title}</h3>
        {trending && (
          <div className="absolute top-2 right-2 text-red-500 font-bold text-sm text-left px-2 py-1 bg-secondary-background  rounded-lg">
            Trending
          </div>
        )}
      </div>
    </div>
  )
}

const HeroSection: React.FC = () => {
  return (
    <section className="lg:container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mx-auto">
      {articles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </section>
  )
}

export default HeroSection