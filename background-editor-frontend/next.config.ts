import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/shared/lib/intl/index.ts');
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 's3.ipst-dev.com'
      }
    ],
    unoptimized: true
  }
};

export default withNextIntl(nextConfig);
