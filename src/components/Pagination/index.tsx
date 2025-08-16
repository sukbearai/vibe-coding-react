import { ReactNode } from 'react';

export interface PaginationProps {
  current: number; // 当前页码，从1开始
  pageSize: number;
  total: number;
  totalPages: number;
  onChange: (page: number) => void;
  simple?: boolean;
}

/**
 * 分页组件
 * 支持标准和简化版两种模式，自适应移动端
 */
const Pagination = ({
  current,
  pageSize,
  total,
  totalPages,
  onChange,
  simple = false,
}: PaginationProps) => {
  // 计算显示的页码按钮
  const getPageButtons = (): ReactNode[] => {
    const buttons: ReactNode[] = [];
    
    // 根据当前页决定显示哪些页码
    let startPage: number;
    let endPage: number;
    
    if (totalPages <= 5) {
      // 总页数小于等于5，显示所有页码
      startPage = 1;
      endPage = totalPages;
    } else if (current < 3) {
      // 当前页接近开始，显示前5页
      startPage = 1;
      endPage = 5;
    } else if (current > totalPages - 2) {
      // 当前页接近结束，显示最后5页
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      // 当前页在中间，显示当前页及其前后2页
      startPage = current - 2;
      endPage = current + 2;
    }
    
    // 生成页码按钮
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
            i === current ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
  };

  if (simple) {
    // 简化版分页控件（适用于移动设备等）
    return (
      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between">
          <button
            onClick={() => onChange(Math.max(1, current - 1))}
            disabled={current === 1}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              current === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            上一页
          </button>
          <button
            onClick={() => onChange(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
              current === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            下一页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            显示第 <span className="font-medium">{(current - 1) * pageSize + 1}</span> 到 
            <span className="font-medium">{Math.min(current * pageSize, total)}</span> 条，
            共 <span className="font-medium">{total}</span> 条
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* 首页按钮 */}
            <button
              onClick={() => onChange(1)}
              disabled={current === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                current === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">首页</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M8 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* 上一页按钮 */}
            <button
              onClick={() => onChange(Math.max(1, current - 1))}
              disabled={current === 1}
              className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                current === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">上一页</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* 页码按钮 */}
            {getPageButtons()}
            
            {/* 下一页按钮 */}
            <button
              onClick={() => onChange(Math.min(totalPages, current + 1))}
              disabled={current === totalPages}
              className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                current === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">下一页</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* 末页按钮 */}
            <button
              onClick={() => onChange(totalPages)}
              disabled={current === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                current === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">末页</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12 4a1 1 0 00-1 1v10a1 1 0 102 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
      
      {/* 移动设备版 */}
      <div className="flex sm:hidden">
        <button
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            current === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          上一页
        </button>
        <div className="mx-2 text-sm text-gray-700">
          第 {current}/{totalPages} 页
        </div>
        <button
          onClick={() => onChange(Math.min(totalPages, current + 1))}
          disabled={current === totalPages}
          className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            current === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default Pagination;
