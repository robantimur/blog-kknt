import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xoyfvbzzxnpvednkctur.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kelautan.fpik.undip.ac.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dk4fkkwa4o9l0.cloudfront.net',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
