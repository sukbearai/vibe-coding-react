import { ReactNode, useContext, useEffect, useState } from "react";
import { UserContext, UserContextType, UserInfo } from "./userContext";
import { AuthContext } from "./authContext";

// 定义 UserProvider 属性接口
interface UserProviderProps {
  children: ReactNode;
}

/**
 * 用户信息提供者组件
 * 提供用户信息状态和相关功能
 */
export const UserProvider = ({ children }: UserProviderProps) => {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 获取用户信息
  const fetchUserInfo = async (): Promise<UserInfo | null> => {
    if (!token) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      // 此处应替换为实际的用户信息API调用
      // 模拟API响应
      const mockUserInfo: UserInfo = {
        id: 1,
        username: "admin",
        name: "suk.bear",
        avatar: "",
        email: "suk.bear.suwu@gmail.com",
        phone: "18179553509",
        roles: ["admin"],
        permissions: ["user:read", "user:write"]
      };
      
      return mockUserInfo;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('获取用户信息失败'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 刷新用户信息
  const refreshUserInfo = async (): Promise<void> => {
    const user = await fetchUserInfo();
    setUserInfo(user);
  };

  // 当认证状态改变时，获取用户信息
  useEffect(() => {
    if (isAuthenticated && !userInfo) {
      refreshUserInfo();
    } else if (!isAuthenticated && userInfo) {
      setUserInfo(null);
    }
  }, [isAuthenticated]);

  // 构建上下文值
  const contextValue: UserContextType = {
    userInfo,
    loading,
    error,
    setUserInfo,
    refreshUserInfo,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
