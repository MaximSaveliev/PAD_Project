import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Admin Panel</h2>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavLink
          to="/admin/dashboard"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/user-list"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          User List
        </NavLink>
        <NavLink
          to="/admin/article-list"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Article List
        </NavLink>
        <NavLink
          to="/admin/create-article"
          className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Create Article
        </NavLink>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2024 Admin Panel
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
