/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // 优化生产环境
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 优化包大小
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  // 禁用X-Powered-By header
  poweredByHeader: false,
}

module.exports = nextConfig 