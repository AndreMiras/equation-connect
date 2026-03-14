/// <reference types="vitest" />
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
  resolve: {
    alias: {
      assert: path.resolve(__dirname, "src/assert-shim.ts"),
    },
  },
  build: {
    outDir: "build",
  },
  base: command === "serve" ? "/" : "/equation-connect/",
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: false,
  },
}));
