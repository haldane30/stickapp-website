import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Enable MDX pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Static export for Vercel (can remove if using server features)
  // output: 'export',

  images: {
    // Domains for external images (add as needed)
    remotePatterns: [],
  },
};

const withMDX = createMDX({
  // Add MDX plugins here if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
