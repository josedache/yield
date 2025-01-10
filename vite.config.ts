import { defineConfig, loadEnv  } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import viteSvgr from "vite-plugin-svgr";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
  resolve: {
    alias: {
      apis: path.resolve(__dirname, "src/apis"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      configs: path.resolve(__dirname, "src/configs"),
      constants: path.resolve(__dirname, "src/constants"),
      enums: path.resolve(__dirname, "src/enums"),
      modules: path.resolve(__dirname, "src/modules"),
      hooks: path.resolve(__dirname, "src/hooks"),
      libs: path.resolve(__dirname, "src/libs"),
      contexts: path.resolve(__dirname, "src/contexts"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
  plugins: [react(), tsconfigPaths(), viteSvgr(),  
    sentryVitePlugin({
    org: "creditdirect",
    project: "savings_yield",
    authToken: env.VITE_SENTRY_AUTH_TOKEN,
    telemetry: false,
  }),],

}});
