import React, { useContext, useRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { auth } from '../../pages/user/Auth/firebase-config';
import { User } from 'firebase/auth';
import Search from '../../components/Search';

// Interface for navigation items
interface NavigationItem {
  name: string;
  link: string;
}

// Interface for theme context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const UserHeader: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext as React.Context<ThemeContextType>);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userInitials, setUserInitials] = useState<string>('');
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const userTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Navigation items array
  const navigationItems: NavigationItem[] = [
    { name: 'World', link: '/world' },
    { name: 'Politics', link: '/politics' },
    { name: 'Business', link: '/business' },
    { name: 'Technology', link: '/technology' },
    { name: 'Health', link: '/health' },
    { name: 'Science', link: '/science' },
    { name: 'Entertainment', link: '/entertainment' },
    { name: 'Sports', link: '/sports' },
    { name: 'Opinion', link: '/opinion' },
  ];

  // Effect to handle auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        const names = currentUser.displayName.split(' ');
        const initials = names.map(name => name[0]).join('').toUpperCase();
        setUserInitials(initials);
      }
    });

    return () => unsubscribe();
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Dropdown handlers for navigation menu
  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 100);
  };

  // Dropdown handlers for user menu
  const handleUserMouseEnter = () => {
    if (userTimeoutId.current) {
      clearTimeout(userTimeoutId.current);
    }
    setIsUserDropdownVisible(true);
  };

  const handleUserMouseLeave = () => {
    userTimeoutId.current = setTimeout(() => {
      setIsUserDropdownVisible(false);
    }, 100);
  };

  return (
    <>
      <header className="py-2 px-4 border-border-dividers">
        <div className="flex justify-between lg:justify-around items-center mx-auto">
          {/* Burger Menu */}
          <button
            onClick={toggleSidebar}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-hover"
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>

          {/* Logo */}
          <div className="flex items-center text-xl font-bold select-none">
            <NavLink to="/" className="cursor-pointer">
              News<span className="text-red-500">Hub</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-3 items-center select-none">
            {navigationItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) => 
                  `px-4 py-2 rounded-lg hover:bg-bg-hover ${isActive ? 'bg-bg-hover' : ''}`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center gap-1 px-4 py-2 hover:bg-bg-hover rounded-lg cursor-pointer">
                <span>More</span>
                <i className={`fa-solid ${isDropdownVisible ? 'fa-chevron-up' : 'fa-chevron-down'} text-secondary-text`}></i>
              </div>
              {isDropdownVisible && (
                <div className="absolute mt-2 p-2 w-40 bg-background border border-border-dividers shadow-lg rounded-lg z-10">
                  {navigationItems.slice(4).map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.link}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg hover:bg-bg-hover ${isActive ? 'bg-bg-hover' : ''}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section */}
          <div className="relative flex items-center gap-0 md:gap-4">
            {/* Search */}
            <button
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-hover"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Search
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />

            {/* User Profile */}
            <div 
              className="relative"
              onMouseEnter={handleUserMouseEnter}
              onMouseLeave={handleUserMouseLeave}
            >
              {user ? (
                // Authenticated User Avatar
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white cursor-pointer select-none hover:bg-blue-700 transition-colors">
                  {userInitials}
                </div>
              ) : (
                // Non-authenticated User Avatar
                <div className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-hover cursor-pointer transition-colors">
                  <i className="fa-regular fa-user text-xl"></i>
                </div>
              )}

              {/* User Dropdown */}
              {isUserDropdownVisible && (
                <div className="absolute right-0 mt-2 p-2 w-48 bg-background border border-border-dividers rounded-lg shadow-lg z-50">
                  {user ? (
                    // Authenticated User Menu
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border-dividers">
                        <p className="font-medium truncate">{user.displayName}</p>
                        <p className="text-sm text-secondary-text truncate">{user.email}</p>
                      </div>
                      <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-2 my-2 rounded-lg hover:bg-bg-hover"
                      >
                        <i className="fa-regular fa-user w-5 mr-2"></i>
                        Profile
                      </NavLink>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-bg-hover text-left text-red-500"
                      >
                        <i className="fa-solid fa-right-from-bracket w-5 mr-2"></i>
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    // Non-authenticated User Menu
                    <div className="py-1">
                      <NavLink
                        to="/login"
                        className="flex items-center px-4 py-2 rounded-lg hover:bg-bg-hover"
                      >
                        <i className="fa-solid fa-right-to-bracket w-5 mr-2"></i>
                        Sign In
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className="flex items-center px-4 py-2 rounded-lg hover:bg-bg-hover"
                      >
                        <i className="fa-solid fa-user-plus w-5 mr-2"></i>
                        Sign Up
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-hover"
              aria-label="Toggle theme"
            >
              <i className={`text-xl ${
                theme === 'light'
                  ? 'fa-solid fa-moon'
                  : 'fa-regular fa-sun-bright text-yellow-800'
              }`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden z-50 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-background transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-dividers">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-lg hover:bg-bg-hover"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-col h-[calc(100%-70px)]">
            {/* Search in Sidebar */}
            <div className="p-4">
              <button
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-bg-hover"
                onClick={() => {
                  setIsSearchOpen(true);
                  toggleSidebar();
                }}
              >
                <span>Search</span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg hover:bg-bg-hover ${isActive ? 'bg-bg-hover' : ''}`
                  }
                  onClick={toggleSidebar}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-border-dividers mt-auto">
              <button
                onClick={toggleTheme}
                className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-bg-hover"
              >
                <i className={`text-xl mr-3 ${
                  theme === 'light'
                    ? 'fa-solid fa-moon'
                    : 'fa-regular fa-sun-bright text-yellow-800'
                }`}></i>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;