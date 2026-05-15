import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this project — avoids it being inferred from a
  // parent directory when multiple lockfiles are present.
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
