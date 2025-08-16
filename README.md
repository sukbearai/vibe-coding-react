# Vibe Coding React

一个现代化的 React 管理系统前端框架，基于 React 18、TypeScript、Vite、Tailwind CSS 和 React Query 构建。

## 技术栈

- **框架**: [React 18](https://reactjs.org/) 
- **路由**: [React Router v7](https://reactrouter.com/)
- **状态管理**: [React Context](https://reactjs.org/docs/context.html) + [React Query](https://tanstack.com/query/latest)
- **构建工具**: [Vite 6](https://vitejs.dev/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI 组件**:
  - [Framer Motion](https://www.framer.com/motion/) (动画)
  - [Sonner](https://sonner.emilkowal.ski/) (通知提示)
  - [Recharts](https://recharts.org/) (图表)
- **工具库**:
  - [Zod](https://zod.dev/) (数据校验)
  - [JSEncrypt](https://github.com/travist/jsencrypt) (加密)
  - [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge) (类名合并)

## 项目功能

- 用户认证与授权管理
- 路由守卫（公共和受保护路由）
- 布局系统（侧边栏、页头等）
- API 集成（React Query）
- 错误处理
- 响应式设计

## 项目结构

```
src/
  ├── api/              # API 相关代码，包括请求客户端和查询配置
  ├── assets/           # 静态资源
  ├── components/       # 可重用组件
  │   ├── DataCard/     # 数据卡片组件
  │   ├── DataTable/    # 数据表格组件
  │   ├── Header/       # 页面头部组件
  │   ├── Layout/       # 页面布局组件
  │   └── ...
  ├── contexts/         # React Context 相关代码
  ├── hooks/            # 自定义 React Hooks
  ├── lib/              # 通用工具和辅助函数
  ├── pages/            # 页面组件
  │   ├── Login/        # 登录页面
  │   ├── Error/        # 错误页面
  │   └── NotFound/     # 404页面
  └── types/            # TypeScript 类型定义
```

## 本地开发

### 环境要求

- [Node.js](https://nodejs.org/en) 18+ 
- [pnpm](https://pnpm.io/installation) 8+

### 安装和运行

1. **克隆仓库**

```sh
git clone <repository-url>
cd vibe-coding-react
```

2. **安装依赖**

```sh
pnpm install
```

3. **启动开发服务器**

```sh
pnpm run dev
```

4. **访问应用**

在浏览器中打开 [http://localhost:4000](http://localhost:4000)

### 构建生产版本

```sh
pnpm run build
```

生产构建文件将输出到 `dist/static` 目录。

## 开发规范

- 使用 TypeScript 强类型
- 使用 Zod 进行数据验证
- 使用 React Query 进行服务器状态管理
- 使用 Context API 进行本地状态管理
- 使用 Tailwind CSS 进行样式设计
