import { useContext } from 'react';
import { UserContext } from '@/contexts/userContext';

/**
 * 用户信息Hook
 * 提供当前用户信息和相关功能
 */
export function useUser() {
  const { userInfo, loading, error, refreshUserInfo } = useContext(UserContext);
  
  /**
   * 检查用户是否具有指定角色
   */
  const hasRole = (role: string): boolean => {
    return !!userInfo?.roles?.includes(role);
  };
  
  /**
   * 检查用户是否具有指定权限
   */
  const hasPermission = (permission: string): boolean => {
    return !!userInfo?.permissions?.includes(permission);
  };
  
  return {
    userInfo,
    loading,
    error,
    refreshUserInfo,
    hasRole,
    hasPermission,
  };
}
