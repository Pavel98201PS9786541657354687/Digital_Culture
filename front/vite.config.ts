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
      proxy: {
        "/api": {
          // target: "http://91.222.239.188:8001",
          target: "http://digitalkultura.ru:8001",
          changeOrigin: true,
          rewrite: (path) => path.replace(`/^/api /`, ""),
        },
      },
    },
    define: processEnvValues,
  });
};
