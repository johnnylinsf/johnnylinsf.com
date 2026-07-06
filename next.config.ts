import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  rewrites: async () => [
    { source: "/writing/:slug.md", destination: "/writing/:slug/md" },
    { source: "/projects/:slug.md", destination: "/projects/:slug/md" },
    { source: "/experience.md", destination: "/experience/md" },
    { source: "/writing.md", destination: "/writing/md" },
    { source: "/charities.md", destination: "/charities/md" },
    { source: "/work-with-me.md", destination: "/work-with-me/md" },
    { source: "/bubble.md", destination: "/bubble/md" },
    { source: "/stack.md", destination: "/stack/md" },
    { source: "/privacy-policy.md", destination: "/privacy-policy/md" },
  ],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://vitals.vercel-insights.com; frame-src https://www.youtube.com https://www.tella.tv" },
        { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), payment=()" },
      ],
    },
    {
      source: "/headshot.png",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
