import { Route, Routes } from 'react-router-dom'
import Article from '../pages/user/Articles/Article'
import ArticleList from '../pages/user/Articles/ArticlesList'
import Categories from '../pages/user/Articles/Categories'
import SearchResult from '../pages/user/Articles/SearchResult'
import UserProfile from '../pages/user/Profile/UserProfile'
import SavedArticles from '../pages/user/Profile/SavedArticles'
import Login from '../pages/user/Auth/Login'
import Register from '../pages/user/Auth/Register'
import Main from '../pages/Main'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:id" element={<Article />} />
      <Route path="/articles/search" element={<SearchResult />} />
      <Route path="/articles/categories" element={<Categories />} />
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/profile/:id/saved-articles" element={<SavedArticles />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default UserRoutes