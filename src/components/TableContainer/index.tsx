import React, { ReactNode } from 'react';

interface TableContainerProps {
  title: string;
  children: ReactNode;
  actionComponent?: ReactNode;
}

/**
 * 表格容器组件
 * 为表格提供标题和操作区域的容器
 */
const TableContainer: React.FC<TableContainerProps> = ({ 
  title, 
  children, 
  actionComponent 
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {actionComponent && actionComponent}
      </div>
      {children}
    </div>
  );
};

export default TableContainer;
