import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import svgr from "vite-plugin-svgr";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      prev[key] = val;
      return prev;
    }, {}),
  };
  return defineConfig({
    plugins: [react(), svgr(), envCompatible()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
      // host: "0.0.0.0", // Позволяет доступ с других устройств в сети
      // port: 5173,
      proxy: {
        "/api": {
          // target: "https://digitalkultura.ru",
          target: "http://46.229.212.235:8001",
          changeOrigin: true,
        },
        "/media": {
          target: "https://digitalkultura.ru",
          // target: "http://46.229.212.235:8001",
          secure: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(`/^/media/`, "/media"),
        },
      },
    },
    define: processEnvValues,
  });
};
