/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/tours/private/:id*',
        destination: '/tours/themed-private/:id*',
        permanent: true,
      },
    ];
  },
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
      {
        protocol: 'https',
        hostname: 'bokun.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'imgcdn.bokun.tools',
      },
    ],
  },
}

export default nextConfig
