import { Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import UserLayout from './layouts/UserLayout/UserLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

const App = () => {

  return (
    <>
        <Routes>
          <Route
            path="/*"
            element={
              <UserLayout>
                <UserRoutes />
              </UserLayout>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            }
          />
        </Routes>
    </>
  )
}

export default App;
