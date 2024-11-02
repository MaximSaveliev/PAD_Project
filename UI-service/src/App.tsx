import { Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import UserLayout from './layouts/UserLayout/UserLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

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
