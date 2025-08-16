import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  description?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * 数据卡片组件，用于展示关键指标
 */
const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        'bg-white p-6 rounded-lg shadow-sm border border-gray-100',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-primary-50 text-primary-600">
            {icon}
          </div>
        )}
      </div>

      {(trend || description) && (
        <div className="mt-2">
          {trend && (
            <div className="flex items-center">
              <span
                className={clsx(
                  'text-sm font-medium mr-1',
                  trend.isUp ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isUp ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={clsx(
                  'w-4 h-4',
                  trend.isUp ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isUp ? (
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1h6a1 1 0 011 1v4zm-3 5a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1h-6a1 1 0 01-1-1v-4z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-4zm3-5a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1H8z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DataCard;
