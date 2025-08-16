import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';

/**
 * 错误页面组件
 * 显示API错误或系统错误信息
 */
const ErrorPage: React.FC = () => {
  const [errorInfo, setErrorInfo] = useState<{
    status?: number;
    message?: string;
    endpoint?: string;
  } | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // 从sessionStorage获取错误信息
    const storedError = sessionStorage.getItem('apiError');
    if (storedError) {
      try {
        setErrorInfo(JSON.parse(storedError));
        // 清除存储的错误信息，避免刷新页面后再次显示
        sessionStorage.removeItem('apiError');
      } catch (e) {
        console.error('解析错误信息失败:', e);
      }
    }
  }, []);
  
  const getErrorTitle = () => {
    if (!errorInfo?.status) return '系统错误';
    
    switch (errorInfo.status) {
      case 401: return '未授权访问';
      case 403: return '拒绝访问';
      case 404: return '资源未找到';
      case 500: return '服务器内部错误';
      default: return `错误 ${errorInfo.status}`;
    }
  };
  
  const getErrorDescription = () => {
    if (errorInfo?.message) return errorInfo.message;
    
    if (!errorInfo?.status) return '发生了未知错误，请稍后再试。';
    
    switch (errorInfo.status) {
      case 401: return '您没有权限访问此资源，请登录后重试。';
      case 403: return '您没有足够的权限执行此操作。';
      case 404: return '请求的资源不存在。';
      case 500: return '服务器发生了内部错误，请稍后再试或联系管理员。';
      default: return `发生了错误，错误代码: ${errorInfo.status}`;
    }
  };
  
  const handleRetry = () => {
    // 如果有API端点信息，可以尝试重新请求
    if (errorInfo?.endpoint) {
      navigate(-1); // 返回上一页
    } else {
      navigate('/'); // 否则回到首页
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <PageHeader 
            title={getErrorTitle()} 
            description="系统遇到了一个问题"
          />
          
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <div className="text-red-500 text-lg font-semibold mb-4">
              {getErrorTitle()}
            </div>
            
            <p className="text-gray-600 mb-6">
              {getErrorDescription()}
            </p>
            
            {errorInfo?.endpoint && (
              <div className="bg-gray-50 p-3 rounded text-left mb-6 text-sm">
                <p className="font-semibold mb-1">错误详情：</p>
                <p className="break-all text-gray-500">API: {errorInfo.endpoint}</p>
                {errorInfo.status && (
                  <p className="text-gray-500">状态码: {errorInfo.status}</p>
                )}
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {errorInfo?.endpoint ? '返回重试' : '刷新页面'}
              </button>
              
              <Link
                to="/"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                返回首页
              </Link>
            </div>
          </div>
          
          <div className="mt-4 text-gray-500 text-sm">
            如果问题持续存在，请联系系统管理员
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
