import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ["src"], insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LoaderPack",
      formats: ["es", "umd"],
      fileName: "loader-pack",
    },
    rollupOptions: {
      // Don't bundle React — the consumer provides it
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    cssCodeSplit: false, // bundle all CSS into one style.css
    assetsInlineLimit: 300000, // inline audio files as base64 data URIs
  },
});