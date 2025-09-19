# ZION Web Dashboard

This is a Next.js web application for monitoring and managing ZION cryptocurrency nodes.

## Features

- Real-time node status monitoring
- Blockchain statistics (height, difficulty, last block)
- Network information (peers, mempool, uptime)
- Mining pool status and worker count
- Responsive design for desktop and mobile
- Auto-refreshing data every 5 seconds

## Development

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Make sure your ZION daemon is running on `localhost:18081` for the API proxy to work.

## Building for Production

```bash
npm run build
npm run start
```

## Configuration

The application expects the ZION daemon HTTP status server to be running on port 18081. You can modify the API proxy settings in `next.config.js` if needed.

## API Endpoints

The dashboard connects to these ZION node endpoints:

- `/status` - JSON status data
- `/` - HTML status page (not used by dashboard)

## Deployment

The application can be deployed using:

- Static export: `npm run build && npm run export`
- Docker: Use the included Dockerfile
- Vercel, Netlify, or other Next.js hosting platforms