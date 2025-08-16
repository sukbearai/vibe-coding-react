import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@/hooks';
import { defaultAvatar } from '@/assets';

interface HeaderProps {
  onSidebarToggle: () => void;
}

/**
 * 顶部导航栏组件
 * 包含应用标题、搜索框和用户下拉菜单
 */
const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { userInfo } = useUser();
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 flex h-16 items-center justify-between">
        {/* 左侧部分 */}
        <div className="flex items-center">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* 搜索框 */}
          <div className="ml-4 hidden sm:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="搜索..."
              />
            </div>
          </div>
        </div>
        
        {/* 右侧用户菜单 */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            id="user-menu"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            <span className="sr-only">打开用户菜单</span>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              {userInfo?.avatar ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={userInfo.avatar}
                  alt={userInfo.name || '用户头像'}
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src={defaultAvatar}
                  alt={userInfo?.name || '用户头像'}
                />
              )}
            </div>
            <span className="ml-2 hidden md:block text-gray-700">{userInfo?.name || '用户'}</span>
            <svg className="ml-1 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* 用户下拉菜单 */}
          {userMenuOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <div className="py-1" role="none">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate('/profile');
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  个人信息
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate('/settings');
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  账户设置
                </button>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  role="menuitem"
                >
                  退出登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
