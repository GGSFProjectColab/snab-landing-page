import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.insforge.app" },
      { protocol: "https", hostname: "zztrxs4z.ap-southeast.insforge.app" },
    ],
  },
  serverExternalPackages: ["tailwindcss"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
