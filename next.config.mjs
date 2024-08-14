/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'apiv3.apifootball.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apiv3.apifootball.com',
        pathname: '/badges/**',
      },
    ],
  },
};

export default nextConfig;
