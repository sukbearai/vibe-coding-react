import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 主布局组件
 * 包含顶部导航栏和侧边栏
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 侧边栏 */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      {/* 主内容区 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 顶部导航 */}
        <Header onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        {/* 页面内容 */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
