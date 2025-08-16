import { QueryClient } from '@tanstack/react-query';

// 创建QueryClient实例，并配置默认选项
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5分钟内不会重新获取数据，除非手动失效
      staleTime: 5 * 60 * 1000,
      
      // 网络错误时最多重试1次
      retry: 1,
      
      // 窗口重新获得焦点时不自动重新获取数据
      refetchOnWindowFocus: false,
    },
    mutations: {
      // 默认错误处理
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});
