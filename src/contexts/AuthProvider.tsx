import { ReactNode, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./authContext";

// 定义 AuthProvider 属性接口
interface AuthProviderProps {
  children: ReactNode;
}

// 本地存储中 Token 的键名
const TOKEN_KEY = "auth_token";

/**
 * 认证提供者组件
 * 提供认证状态和相关功能
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  // 状态管理
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // 初始化时从本地存储加载认证状态
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // 保存 token 到本地存储
  const saveToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
    setToken(newToken);
  };

  // 使用用户名和密码登录
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // 此处应替换为实际的登录API调用
      console.log('登录请求:', { username, password });
      
      // 模拟成功响应
      const mockToken = "mock_token_" + Date.now();
      saveToken(mockToken);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("登录失败:", error);
      return false;
    }
  };

  // 登出
  const logout = () => {
    saveToken(null);
    setIsAuthenticated(false);
  };

  // 检查用户是否已认证
  const checkAuth = (): boolean => {
    return isAuthenticated && !!token;
  };

  // 构建上下文值
  const contextValue: AuthContextType = {
    isAuthenticated,
    token,
    setIsAuthenticated,
    setToken: saveToken,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
