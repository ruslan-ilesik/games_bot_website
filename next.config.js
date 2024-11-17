const isExport = process.env.NEXT_PHASE === 'phase-export';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    async rewrites() {
        if (isExport) {
            return [];
        }
        return [
          {
            source: '/api/:path*', // Forward all requests starting with /api
            destination: 'http://localhost:8080/api/:path*', // Replace with your backend's URL and port
          },
          {
            source: '/auth/:path*', // Forward all requests starting with /api
            destination: 'http://localhost:8080/auth/:path*', // Replace with your backend's URL and port
          },
          {
            source: '/action/:path*', // Forward all requests starting with /api
            destination: 'http://localhost:8080/action/:path*', // Replace with your backend's URL and port
          },
        ];
    },
}

module.exports = nextConfig
