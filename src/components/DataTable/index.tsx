import { ReactNode } from 'react';

export interface TableColumn<T> {
  title: string;
  key: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  width?: string | number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyText?: string;
  rowKey: string | ((record: T) => string);
}

/**
 * 数据表格组件
 * 通用表格组件，支持自定义列渲染、加载状态和空数据显示
 */
const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyText = '暂无数据',
  rowKey,
}: DataTableProps<T>) => {
  // 处理行的key
  const getRowKey = (record: T, _index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey]);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={column.key || index} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: column.width, minWidth: column.width || '100px' }}
                >
                  <div className="flex items-center">
                    {column.title}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center text-gray-400">
                    <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    加载中...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((record, index) => (
                <tr key={getRowKey(record, index)} className="hover:bg-gray-50">
                  {columns.map((column, columnIndex) => (
                    <td key={column.key || columnIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800" style={{ minWidth: column.width || '100px' }}>
                      <div className="flex items-center">
                        {column.render 
                          ? column.render(record[column.key], record, index)
                          : record[column.key]
                        }
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
