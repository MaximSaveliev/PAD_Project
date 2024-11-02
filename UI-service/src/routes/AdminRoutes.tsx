import { Route, Routes } from 'react-router-dom'
import ArticleList from '../pages/admin/Articles/ArticlesList'
import CreateArticle from '../pages/admin/Articles/CreateArticle'
import EditArticle from '../pages/admin/Articles/EditArticle'
import AdminDashboard from '../pages/admin/AdminDashboard'
import CategoriesManagement from '../pages/admin/CategoriesManagement'
import UsersList from '../pages/admin/Users'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/create" element={<CreateArticle />} />
      <Route path="/articles/edit/:id" element={<EditArticle />} />
      <Route path="/categories" element={<CategoriesManagement />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AdminRoutes;