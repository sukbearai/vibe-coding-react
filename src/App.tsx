import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/Error";
import { PublicRoute, ProtectedRoute } from '@/contexts/RouteGuard';

// 使用自定义组件包装导入的ProtectedRoute，支持嵌套路由
const AuthenticatedLayout = () => {
  return <Layout><Outlet /></Layout>;
};

/**
 * 示例应用程序路由配置
 * 包含公共路由和受保护路由
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<PublicRoute restricted={true}><Login /></PublicRoute>} />
      
      {/* 受保护路由 - 使用嵌套路由结构 */}
      <Route element={<ProtectedRoute><AuthenticatedLayout /></ProtectedRoute>}>
        {/* 仪表盘 */}
        <Route path="/dashboard" element={<div className="p-4">仪表盘页面</div>} />
        
        {/* 设置 */}
        <Route path="/settings" element={<div className="p-4">系统设置页面</div>} />
        
        {/* 用户管理 */}
        <Route path="/users">
          <Route index element={<div className="p-4">用户管理首页</div>} />
          <Route path="list" element={<div className="p-4">用户列表页面</div>} />
          <Route path="add" element={<div className="p-4">添加用户页面</div>} />
          <Route path="edit/:id" element={<div className="p-4">编辑用户页面</div>} />
          <Route path="detail/:id" element={<div className="p-4">用户详情页面</div>} />
        </Route>
        
        {/* 个人信息 */}
        <Route path="/profile" element={<div className="p-4">个人信息页面</div>} />
      </Route>
      
      {/* 错误页面 */}
      <Route path="/error" element={<ErrorPage />} />
      
      {/* 404页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
