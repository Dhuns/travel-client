/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TypeScript errors will fail the build
    ignoreBuildErrors: false,
  },
  images: {
    // Enable Next.js image optimization
    unoptimized: false,
    // External image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tumakr-dev.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'tumakr.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'imgproxy.bokun.io',
      },
      {
        protocol: 'https',
        hostname: 'images.bokun.io',
      },
    ],
  },
}

export default nextConfig
