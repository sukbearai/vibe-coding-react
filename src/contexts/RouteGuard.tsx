import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./authContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * 受保护的路由组件 - 确保只有认证用户可以访问
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { checkAuth } = useContext(AuthContext);
  const location = useLocation();
  
  // 如果用户未认证，重定向到登录页面，并记住尝试访问的URL
  if (!checkAuth()) {
    console.log('用户未登录，正在重定向到登录页面');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean;
}

/**
 * 公共路由组件 - 如果设置了 restricted 且用户已登录，重定向到首页
 */
export const PublicRoute = ({ children, restricted = false }: PublicRouteProps) => {
  const { checkAuth } = useContext(AuthContext);
  
  // 如果路由是受限的(例如登录页)且用户已登录，重定向到首页
  if (restricted && checkAuth()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
