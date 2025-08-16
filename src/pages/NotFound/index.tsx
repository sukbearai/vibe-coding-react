import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404页面组件
 * 显示未找到页面的错误信息
 */
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-extrabold text-blue-600 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">页面不存在</h1>
          <p className="text-gray-600 mb-8">
            抱歉，您访问的页面不存在或已被删除。
          </p>
          <Link 
            to="/"
            className="inline-block px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
        </div>
        <div className="text-gray-500 text-sm">
          <p>如需帮助，请联系系统管理员</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
