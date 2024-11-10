import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Search from '../../components/Search';

const AdminHeader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigationItems = [
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

  return (
    <>
      <header className="py-2 px-4">
        <div className="flex justify-between lg:justify-around items-center mx-auto">
          {/* Burger Menu - visible on all screens except large */}
          <button
            onClick={toggleSidebar}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-hover"
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>

          {/* Logo Section */}
          <div className="flex items-center text-xl font-bold select-none">
            <NavLink to={'/'} className="cursor-default">
              News<span className="text-red-500">Hub</span>
            </NavLink>
          </div>

          {/* Navigation Links - visible only on large screens */}
          <nav className="hidden lg:flex gap-3 items-center select-none">
            {navigationItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className="px-4 py-2 rounded-lg hover:bg-bg-hover"
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
                <i
                  className={`fa-solid ${isDropdownVisible ? 'fa-chevron-up' : 'fa-chevron-down'} text-secondary-text`}
                ></i>
              </div>
              {isDropdownVisible && (
                <div className="absolute mt-2 p-2 w-40 bg-background border-none outline-none shadow-sm rounded-lg">
                  {navigationItems.slice(4).map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.link}
                      className="block px-4 py-2 rounded-lg hover:bg-bg-hover"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section */}
          <div className="relative flex items-center gap-4">
            <div className="hidden lg:grid lg:absolute lg:left-[-150px] place-items-center select-none px-4 py-2 rounded-lg hover:bg-bg-hover">
              <NavLink to={'/admin/dashboard'}>
                <span className="pr-2">Admin Panel</span>
                <i className="fa-solid fa-chart-simple"></i>
              </NavLink>
            </div>

            {/* Profile Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white select-none">
              <NavLink to="/admin">MS</NavLink>
            </div>

            {/* Theme Toggle - visible only on large screens */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-bg-hover"
            >
              <i className={`text-xl ${theme === 'light'
                ? 'fa-solid fa-moon'
                : 'fa-regular fa-sun-bright text-yellow-800'
                }`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar - visible on all screens except large */}
      <div
        className={`fixed inset-0 bg-background/30 select-none transition-opacity block lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={toggleSidebar}
      >
        <div
          className={`fixed inset-y-0 left-0 transform transition-all duration-300 flex flex-col ${isSearchOpen
            ? 'w-full bg-background'
            : 'w-64 bg-background'
            } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-dividers">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-lg hover:bg-bg-hover"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div
              className='flex items-center justify-between px-4 py-2 rounded-lg hover:bg-bg-hover cursor-pointer'
              onClick={() => setIsSearchOpen(true)}
            >
              <span>Search</span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <Search
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />

            <NavLink
              to="/admin/dashboard"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-bg-hover"
              onClick={toggleSidebar}
            >
              <i className="fa-solid fa-chart-simple mr-3"></i>
              Admin Panel
            </NavLink>
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className="block px-4 py-2 rounded-lg hover:bg-bg-hover"
                onClick={toggleSidebar}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer with Theme Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-bg-hover"
            >
              <i className={`text-xl mr-3 ${theme === 'light'
                ? 'fa-solid fa-moon'
                : 'fa-regular fa-sun-bright text-yellow-800'
                }`}></i>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;