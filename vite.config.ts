import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,

  vite: {
    base: process.env.GITHUB_ACTIONS ? "/mitakshi-muse-folio/" : "/",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
