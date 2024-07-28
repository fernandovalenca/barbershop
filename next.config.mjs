/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
      {
        hostname: 'https://unsplash.com/'
      }
    ],
  },
};

export default nextConfig;
