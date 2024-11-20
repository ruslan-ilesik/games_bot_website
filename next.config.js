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
            destination: 'http://localhost:8080/api/:path*',
          },
          {
            source: '/auth/:path*', // Forward all requests starting with /auth
            destination: 'http://localhost:8080/auth/:path*', 
          },
          {
            source: '/action/:path*', // Forward all requests starting with /action
            destination: 'http://localhost:8080/action/:path*',
          },
        ];
    },
}

module.exports = nextConfig
