import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === "build"
      ? [dts({ include: ["src"], insertTypesEntry: true })]
      : []),
  ],

  // Dev mode: serve the demo app
  root: command === "serve" ? "demo" : undefined,

  // Build mode: library output
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LoaderPack",
      formats: ["es", "umd"],
      fileName: "loader-pack",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 300000,
  },
}));