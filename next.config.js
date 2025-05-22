/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure CORS for local development
  async headers() {
    return [
      {
        // Match all API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://192.168.178.50:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://reminder.wemolo.com',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
