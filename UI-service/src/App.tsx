import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Import your pages
import Main from './pages/Main';
import Login from './pages/user/Auth/Login';
import Register from './pages/user/Auth/Register';
import SetPassword from './pages/user/Auth/SetPassword';
import Article from './pages/user/Articles/Article';
import ArticleList from './pages/user/Articles/ArticlesList';
import Categories from './pages/user/Articles/Categories';
import SearchResult from './pages/user/Articles/SearchResult';
import UserProfile from './pages/user/Profile/UserProfile';
import SavedArticles from './pages/user/Profile/SavedArticles';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticleList from './pages/admin/Articles/ArticlesList';
import CreateArticle from './pages/admin/Articles/CreateArticle';
import EditArticle from './pages/admin/Articles/EditArticle';
import CategoriesManagement from './pages/admin/CategoriesManagement';
import UsersList from './pages/admin/Users';

library.add(fas, far, fab);

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes - no header/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAuth requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="articles" element={<AdminArticleList />} />
          <Route path="articles/create" element={<CreateArticle />} />
          <Route path="articles/edit/:id" element={<EditArticle />} />
          <Route path="categories" element={<CategoriesManagement />} />
          <Route path="users" element={<UsersList />} />
        </Route>

        {/* User routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="articles">
            <Route index element={<ArticleList />} />
            <Route path=":id" element={<Article />} />
            <Route path="search" element={<SearchResult />} />
            <Route path="categories" element={<Categories />} />
          </Route>

          {/* Protected user routes */}
          <Route
            path="set-password"
            element={
              <ProtectedRoute requireAuth>
                <SetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:id"
            element={
              <ProtectedRoute requireAuth>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:id/saved-articles"
            element={
              <ProtectedRoute requireAuth>
                <SavedArticles />
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;