/// <reference types="vite/client" />

// 为SVG文件添加类型声明
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

/**
 * 为 import.meta.env 添加类型定义
 */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ID: string;
  // 可以添加其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
