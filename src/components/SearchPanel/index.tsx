import React, { ReactNode, KeyboardEvent } from 'react';

interface SearchPanelProps {
  children: ReactNode;
  onSearch: () => void;
  onReset: () => void;
  isLoading?: boolean;
}

/**
 * 搜索面板组件
 * 包含搜索表单和提交/重置按钮
 */
const SearchPanel: React.FC<SearchPanelProps> = ({ 
  children, 
  onSearch, 
  onReset, 
  isLoading = false 
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      onSearch();
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6" onKeyDown={handleKeyDown}>
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {children}
        </div>
        
        <div className="flex justify-end mt-4 md:mt-0 shrink-0">
          <button 
            onClick={onReset}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded mr-3 hover:bg-gray-50"
          >
            重置
          </button>
          <button 
            onClick={onSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
