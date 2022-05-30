import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import scssDts from "vite-plugin-sass-dts";
import { ViteAliases } from "vite-aliases";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      scssDts({
        enabledMode: [mode],
      }),
      ViteAliases(),
    ],

    assetsInclude: ["**/*.png"],

    envPrefix: "ECO",

    server: {
      proxy: {
        "/api": "http://80.249.150.241/",
        "/public": "http://80.249.150.241/",
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @use "./src/styles/variables.scss" as *;
        @use "./src/styles/mixins.scss" as *;
        `,
        },
      },
    },
  };
});
