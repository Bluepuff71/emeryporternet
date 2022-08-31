import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  //Amplify bug workaround
  define: {
    "global": {},
  },
  plugins: [vue(), checker({ vueTsc: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
