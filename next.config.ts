import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The component catalog (Storybook) is built into public/storybook; /components opens it.
  async redirects() {
    return [
      { source: "/components", destination: "/storybook/index.html", permanent: false },
      { source: "/storybook", destination: "/storybook/index.html", permanent: false },
    ];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
