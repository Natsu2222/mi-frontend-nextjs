/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mi-backend-strapi-1.onrender.com',
        pathname: '/uploads/**',
      },
    ],
    domains: ['mi-backend-strapi-1.onrender.com'],
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig

