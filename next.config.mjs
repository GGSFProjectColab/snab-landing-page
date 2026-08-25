import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  serverExternalPackages: ["tailwindcss"],
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "framer-motion",
      "embla-carousel-react",
      "embla-carousel",
      "embla-carousel-autoplay",
      "cobe",
      "@paper-design/shaders-react",
      "@xyflow/react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tooltip",
      "ogl",
      "maplibre-gl",
      "gsap",
      "@gsap/react",
    ],
    turbopackFileSystemCacheForDev: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
