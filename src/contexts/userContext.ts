import { createContext } from "react";

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number;
  username: string;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  permissions?: string[];
}

/**
 * 用户上下文接口
 */
export interface UserContextType {
  userInfo: UserInfo | null;
  loading: boolean;
  error: Error | null;
  setUserInfo: (user: UserInfo | null) => void;
  refreshUserInfo: () => Promise<void>;
}

/**
 * 创建用户上下文
 */
export const UserContext = createContext<UserContextType>({
  userInfo: null,
  loading: false,
  error: null,
  setUserInfo: () => {},
  refreshUserInfo: async () => {},
});
