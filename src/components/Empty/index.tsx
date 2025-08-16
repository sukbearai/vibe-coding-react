import React from 'react';

/**
 * 空状态组件
 * 用于显示列表或表格为空时的状态
 */
const Empty: React.FC<{
  description?: string;
  image?: string;
}> = ({ 
  description = '暂无数据', 
  image = '/empty-box.svg' // 默认图片路径，应替换为实际项目中的图片
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <img src={image} alt="Empty state" className="w-24 h-24 mb-4 opacity-50" />
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default Empty;
