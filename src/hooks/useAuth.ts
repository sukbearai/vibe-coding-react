import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '@/contexts/authContext';
import { useContext } from 'react';

/**
 * 认证Hook
 * 提供登录、登出等认证功能
 */
export function useAuth() {
  const auth = useContext(AuthContext);
  
  return {
    ...auth,
    isLoggedIn: auth.isAuthenticated,
    login: async (username: string, password: string) => {
      return auth.login(username, password);
    },
    logout: auth.logout,
  };
}

interface UseLoginOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 登录Hook
 */
export function useLogin(options?: UseLoginOptions) {
  const { setIsAuthenticated, setToken } = useContext(AuthContext);
  
  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      // 此处应替换为实际的登录API调用
      console.log('登录请求:', { username, password });
      
      // 模拟成功响应
      return { payload: "mock_token_" + Date.now() };
    },
    onSuccess: (data) => {
      // 检查响应中的payload字段，该字段包含JWT令牌
      if (data && data.payload) {
        // 保存token（payload中的值就是JWT token）
        setToken(data.payload);
        setIsAuthenticated(true);
        
        options?.onSuccess?.();
      } else {
        throw new Error("登录响应中无token");
      }
    },
    onError: (error: unknown) => {
      options?.onError?.(error as Error);
    },
  });
}

/**
 * 注销Hook
 */
export function useLogout() {
  const { logout } = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      // 此处可以添加调用注销API的代码
      return true;
    },
    onSuccess: () => {
      // 清除认证状态
      logout();
      
      // 清除缓存的查询数据
      queryClient.clear();
    },
  });
}
