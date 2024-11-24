import { Outlet } from 'react-router-dom';
import  AuthContext from '../context/AuthContext'; // Assuming you have a useAuth hook
import UserHeader from './UserLayout/UserHeader';
import UserFooter from './UserLayout/UserFooter';
import { useContext } from 'react';
import AdminHeader from './AdminLayout/AdminHeader';

const MainLayout = () => {
    const auth = useContext(AuthContext);

  return (
    <>
      {/* Render UserHeader only if the user's role is NOT admin */}
      {auth?.isAdmin !== true && <UserHeader />}
      {auth?.isAdmin === true && <AdminHeader />}
      <main>
        <Outlet />
      </main>
      <UserFooter />
    </>
  );
};

export default MainLayout;
