import React from 'react'

interface Article {
  id: number
  image: string
  title: string
  time: string
  logo: string
  likes: number
  comments: number
  trending: boolean
}

const articles: Article[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Protests Erupt Across Israel After Netanyahu Fires Defense Minister',
    time: '15h',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    likes: 36,
    comments: 20,
    trending: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    likes: 4000,
    comments: 1500,
    trending: false
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    likes: 4000,
    comments: 1500,
    trending: false
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    likes: 4000,
    comments: 1500,
    trending: false
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1730820206640-b740f668f876?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Worst Horror Movies of All Time',
    time: '1w',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png',
    likes: 4000,
    comments: 1500,
    trending: false
  },
  // Add more articles here...
]

const ArticleCard: React.FC<Article> = ({ image, title, time, logo, likes, comments, trending }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto my-4">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
          <img src={logo} alt="Source Logo" className="w-8 h-8 rounded-full" />
          <span>{time}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-center">{title}</h3>
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex space-x-2">
            <span>👍 {likes}</span>
            <span>💬 {comments}</span>
          </div>
          {trending && <span className="text-blue-500">Trending</span>}
        </div>
      </div>
    </div>
  )
}


const HeroSection: React.FC = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </section>
  )
}

export default HeroSection
