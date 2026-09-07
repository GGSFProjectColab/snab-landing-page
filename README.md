# snab.ai.

Landing page for snab.ai, built with Next.js and deployed on Cloudflare Workers.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Deployed via OpenNext on Cloudflare Workers

## Getting Started

Install dependencies:

    npm install

Run the development server:

    npm run dev

Open http://localhost:3000 in your browser.

## Deployment

This project is deployed to Cloudflare Workers using the OpenNext adapter.

Build and deploy:

    npm run deploy

Preview locally before deploying:

    npm run preview

## Project Structure

    app/          Pages and layouts
    components/   Reusable UI components
    public/       Static assets
    wrangler.jsonc  Cloudflare Workers config
