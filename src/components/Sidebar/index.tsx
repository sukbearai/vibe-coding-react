import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

// 定义菜单项接口
interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
}

// 类型守卫：检查菜单项是否有子菜单
function hasChildren(item: MenuItem): boolean {
  return Array.isArray(item.children) && item.children.length > 0;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [previousExpandedState, setPreviousExpandedState] = useState<string[]>([]);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [hoverTop, setHoverTop] = useState<number>(0);
  const hoverTimeoutRef = useRef<number | null>(null);
  
  // 初始化展开的菜单
  useEffect(() => {
    // 只有在侧边栏展开状态下才初始化菜单展开状态
    if (!collapsed) {
      // 先从localStorage获取保存的菜单状态
      const savedExpanded = localStorage.getItem('expandedMenus');
      if (savedExpanded) {
        try {
          const parsedExpanded = JSON.parse(savedExpanded);
          if (Array.isArray(parsedExpanded)) {
            setExpandedMenus(parsedExpanded);
            return;
          }
        } catch (e) {
          console.error('Failed to parse saved menu state', e);
        }
      }
      
      // 如果没有保存的状态，根据当前URL自动展开对应的菜单
      const initExpanded = menuItems.reduce((acc: string[], item) => {
        // 检查当前路径是否匹配父菜单路径
        if (hasChildren(item) && location.pathname.includes(item.path)) {
          acc.push(item.path);
        }
        
        // 检查当前路径是否匹配任何子菜单路径
        if (hasChildren(item)) {
          const matchesChild = item.children?.some(
            child => location.pathname === child.path
          );
          
          if (matchesChild) {
            acc.push(item.path);
          }
        }
        return acc;
      }, []);
      setExpandedMenus(initExpanded);
    }
    
    // 清理定时器
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [location.pathname, collapsed]);
  
  // 监听sidebar折叠状态变化，当折叠时收起所有菜单，展开时恢复之前的状态
  useEffect(() => {
    if (collapsed) {
      // 保存当前展开状态，以便展开sidebar时恢复
      setPreviousExpandedState(expandedMenus);
      // 折叠所有菜单
      setExpandedMenus([]);
    } else {
      // 当展开侧边栏时，检查当前路径并自动展开对应的菜单
      const parentMenusToExpand = menuItems.reduce((acc: string[], item) => {
        if (hasChildren(item)) {
          // 检查当前路径是否匹配父菜单路径
          if (location.pathname.includes(item.path)) {
            acc.push(item.path);
          }
          
          // 检查当前路径是否匹配任何子菜单路径
          const matchesChild = item.children?.some(
            child => location.pathname === child.path
          );
          
          if (matchesChild) {
            acc.push(item.path);
          }
        }
        return acc;
      }, []);
      
      // 合并之前的展开状态和基于当前路径计算出的需要展开的菜单
      const combinedExpanded = [...new Set([
        ...previousExpandedState,
        ...parentMenusToExpand
      ])];
      
      setExpandedMenus(combinedExpanded);
    }
  }, [collapsed, location.pathname]);
  
  // 切换菜单展开/折叠状态
  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => {
      const newExpanded = prev.includes(path) 
        ? prev.filter(item => item !== path) 
        : [...prev, path];
        
      // 保存菜单状态到localStorage，但只有在侧边栏展开状态下才保存
      if (!collapsed) {
        localStorage.setItem('expandedMenus', JSON.stringify(newExpanded));
        
        // 同时更新previousExpandedState，确保折叠再展开时状态一致
        setPreviousExpandedState(newExpanded);
      }
      return newExpanded;
    });
  };
  
  // 菜单数据 - 与路由保持一致
  const menuItems: MenuItem[] = [
    {
      title: '仪表盘',
      icon: 'fa-chart-line',
      path: '/dashboard'
    },
    {
      title: '系统设置',
      icon: 'fa-gear',
      path: '/settings'
    },
    {
      title: '用户管理',
      icon: 'fa-users',
      path: '/users',
      children: [
        { title: '用户列表', path: '/users/list' },
        { title: '添加用户', path: '/users/add' }
      ]
    },
    {
      title: '个人信息',
      icon: 'fa-user',
      path: '/profile'
    }
  ];

  // 处理鼠标悬停事件
  const handleMouseEnter = (path: string, event: React.MouseEvent) => {
    if (collapsed) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      // 获取当前菜单项的位置信息
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setHoverTop(rect.top);
      setHoveredMenu(path);
    }
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setHoveredMenu(null);
    }, 300); // 添加延迟，防止鼠标移动到弹出菜单时菜单消失
  };
  
  // 递归渲染菜单
  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return (
      <ul className="space-y-1 w-full">
         {items.map((item, index) => (
           <li 
             key={item.path || `${item.title}-${index}`} 
             className={cn("mb-1 w-full", collapsed && level === 0 ? "relative overflow-visible" : "")}
             onMouseEnter={(e) => handleMouseEnter(item.path, e)}
             onMouseLeave={handleMouseLeave}
           >
            {hasChildren(item) ? (
              <div className="w-full overflow-visible">
                 <div className="flex items-center w-full">
                   {/* 折叠状态下使用NavLink，展开状态下使用按钮 */}
                   {collapsed ? (
                     <NavLink
                       to={item.path}
                       className={({ isActive }) => 
                         cn(
                           "flex items-center py-3 text-sm font-medium rounded-md border-l-4",
                           "justify-center px-2 w-full",
                           isActive 
                             ? "bg-blue-50 text-blue-700 border-blue-500" 
                             : "text-gray-700 hover:bg-gray-100 border-transparent hover:border-gray-300"
                         )
                       }
                     >
                       <i className={`fa-solid ${item.icon}`}></i>
                     </NavLink>
                   ) : (
                     <button 
                       className="flex items-center w-full py-3 px-4 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 border-l-4 border-transparent hover:border-gray-300 text-left"
                       onClick={() => toggleMenu(item.path)}
                       aria-expanded={expandedMenus.includes(item.path)}
                     >
                       <i className={`fa-solid ${item.icon} mr-3`}></i>
                       <span className="whitespace-nowrap overflow-hidden text-ellipsis flex-grow">{item.title}</span>
                       <i className={`fa-solid fa-chevron-down ml-auto text-xs transition-transform duration-300 ${expandedMenus.includes(item.path) ? 'rotate-180' : ''}`}></i>
                     </button>
                   )}
                 </div>
                 {/* 侧边栏展开时的正常子菜单 */}
                 {!collapsed && (
                   <div className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${expandedMenus.includes(item.path) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="min-w-full">
                       {item.children && renderMenuItems(item.children, level + 1)}
                     </div>
                   </div>
                 )}
                 
                 {/* 侧边栏折叠时的悬浮子菜单 */}
                 {(collapsed && level === 0 && hoveredMenu === item.path) && (
                   <div 
                     className="absolute left-full top-0 ml-2 py-2 bg-white rounded-md shadow-lg border border-gray-200 z-[9999] min-w-[180px]"
                     style={{
                       position: 'fixed',
                       left: '4rem', // 64px
                       top: hoverTop, // 使用记录的鼠标悬停位置
                     }}
                     onMouseEnter={(e) => handleMouseEnter(item.path, e)}
                     onMouseLeave={handleMouseLeave}
                   >
                     <div className="px-2 py-1 font-medium text-gray-500 text-xs border-b border-gray-100 mb-1">
                       <NavLink
                         to={item.path}
                         className={({ isActive }) => 
                           cn(
                             "block w-full font-medium text-xs",
                             isActive ? "text-blue-600" : "text-gray-500"
                           )
                         }
                       >
                         {item.title}
                       </NavLink>
                     </div>
                     {item.children && (
                       <div className="py-1">
                         {item.children.map((child, childIndex) => (
                           <NavLink
                             key={childIndex}
                             to={child.path}
                             onClick={() => {
                               // 当点击子菜单时，记录父菜单需要展开
                               const updatedExpanded = [...previousExpandedState];
                               if (!updatedExpanded.includes(item.path)) {
                                 updatedExpanded.push(item.path);
                                 setPreviousExpandedState(updatedExpanded);
                                 // 同时更新localStorage
                                 localStorage.setItem('expandedMenus', JSON.stringify(updatedExpanded));
                               }
                             }}
                             className={({ isActive }) => 
                               cn(
                                 "block px-4 py-2 text-sm font-medium hover:bg-gray-100",
                                 isActive ? "text-blue-600" : "text-gray-700"
                               )
                             }
                           >
                             {child.title}
                           </NavLink>
                         ))}
                       </div>
                     )}
                   </div>
                 )}
               </div>
            ) : (
               <div className="relative w-full overflow-visible">
                 <NavLink
                   to={item.path}
                   className={({ isActive }) => 
                     cn(
                       "flex items-center py-3 text-sm font-medium rounded-md border-l-4 w-full",
                       collapsed && level === 0 ? "justify-center px-2" : "px-4",
                       isActive 
                         ? "bg-blue-50 text-blue-700 border-blue-500" 
                         : "text-gray-700 hover:bg-gray-100 border-transparent hover:border-gray-300"
                     )
                   }
                   style={{ minWidth: collapsed ? 'auto' : '100%' }}
                 >
                   <i className={`fa-solid ${item.icon} ${!collapsed ? 'mr-3' : ''}`}></i>
                   {!collapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</span>}
                 </NavLink>
                 
                 {/* 没有子菜单的项在折叠时也显示标题悬浮提示 */}
                 {(collapsed && level === 0 && hoveredMenu === item.path) && (
                   <div 
                     className="absolute left-full top-0 ml-2 py-2 px-4 bg-white rounded-md shadow-lg border border-gray-200 z-[9999] whitespace-nowrap"
                     style={{
                       position: 'fixed',
                       left: '4rem', // 64px
                       top: hoverTop, // 使用记录的鼠标悬停位置
                     }}
                     onMouseEnter={(e) => handleMouseEnter(item.path, e)}
                     onMouseLeave={handleMouseLeave}
                   >
                     <NavLink
                       to={item.path}
                       className={({ isActive }) => 
                         cn(
                           "block w-full text-sm font-medium",
                           isActive ? "text-blue-600" : "text-gray-700"
                         )
                       }
                     >
                       {item.title}
                     </NavLink>
                   </div>
                 )}
               </div>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-visible",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          <i className="fa-solid fa-line-chart text-blue-600 text-xl"></i>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-2'}`}>
            <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">后台管理</span>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-4rem)] overflow-visible py-4" style={{ position: 'relative' }}>
        <nav className="px-2 space-y-1">
          {renderMenuItems(menuItems)}
        </nav>
        
        {/* 底部折叠按钮 */}
        <div className={`fixed bottom-4 transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}>
          <div className={`transition-all duration-300 ease-in-out ${collapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 px-4'}`}>
            <button 
              onClick={onToggle}
              className="flex items-center justify-center w-full py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 hover:shadow-md"
            >
              <i className="fa-solid fa-angles-left mr-2 transition-transform duration-300"></i>
              <span className="transition-opacity duration-300">收起菜单</span>
            </button>
          </div>
          
          <div className={`flex justify-center px-3 w-full transition-all duration-300 ease-in-out ${collapsed ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <button 
              onClick={onToggle}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 hover:shadow-md hover:scale-105"
              title="展开菜单"
            >
              <i className="fa-solid fa-angles-right transition-transform duration-300"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
