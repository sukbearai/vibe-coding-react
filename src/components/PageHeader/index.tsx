import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * 页面头部组件
 * 提供页面标题、描述和操作按钮区域
 */
const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description,
  actions
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      
      {actions && (
        <div className="mt-4 md:mt-0 flex space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
