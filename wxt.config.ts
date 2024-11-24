import { defineConfig, WxtDevServer } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Document Blinder",
    version: "1.0.0",
    permissions: ["storage", "activeTab", "background"],
  },
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  outDir: "dist",
  entrypointsDir: "entrypoints",
  dev: {
    server: {
      port: 8080,
    },
  },
  alias: {
    "@": "src",
    "@config": "config.json",
  },
});
