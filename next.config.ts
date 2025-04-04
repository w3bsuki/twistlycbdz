import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  // Configure compression
  compress: true,
  // Disable x-powered-by header
  poweredByHeader: false,
  webpack: (config, { dev, isServer }) => {
    // Fix for "Cannot read properties of undefined (reading 'call')"
    if (config.module && config.module.parser) {
      config.module.parser.javascript = {
        ...config.module.parser.javascript,
        exportsPresence: 'error',
      };
    }
    
    // Add optimizations for production builds
    if (!dev) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        // Enable aggressive dead code elimination
        usedExports: true,
        // Optimize chunk size and loading
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Get the name of the npm package
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                // Return npm.packageName.min to avoid filename too long issues
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        },
      };
    }
    
    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig; 