/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [react(), tsconfigPaths()];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  build: {
  // 启用资源压缩
  minify: 'esbuild',
  terserOptions: {
    compress: {
      drop_console: true, // 删除console语句
    },
  },
  // 启用chunk分割
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        router: ['react-router-dom'],
        charts: ['recharts'],
        ui: ['framer-motion', 'sonner'],
      }
    }
  },
    // 启用源码映射
    sourcemap: false, // 生产环境关闭
  },
  server: {
    proxy: {
      // 配置代理，解决跨域问题
      '/api': {
        target: 'https://dev-st.metaobe.com/api/st-system',  // 替换为你的后端API地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: true  // 启用CORS
  },
});
