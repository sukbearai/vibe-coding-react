import { createContext } from "react";

/**
 * 认证上下文接口
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  setIsAuthenticated: (value: boolean) => void;
  setToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

/**
 * 创建认证上下文
 */
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  setIsAuthenticated: () => {},
  setToken: () => {},
  login: () => Promise.resolve(false),
  logout: () => {},
  checkAuth: () => false,
});
