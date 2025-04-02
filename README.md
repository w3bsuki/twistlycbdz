# Twistly AI - CBD E-commerce Platform

This is a [Next.js](https://nextjs.org) project focused on creating a premium CBD e-commerce experience.

## Development Requirements

- Node.js 18 or later
- pnpm 8 or later

## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager. Please make sure you have it installed:

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm
```

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/public` - Static assets
- `/src/lib` - Utility functions and shared code

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm clean` - Clean build artifacts and node_modules

## Styling

This project uses Tailwind CSS for styling with a custom configuration.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [pnpm](https://pnpm.io/motivation)

## Deployment

The application can be deployed on any platform that supports Next.js applications.

## Deploying to Vercel

This project is configured for deployment on Vercel. Follow these steps to deploy:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel:
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will automatically detect the Next.js framework
   - Configure any environment variables if needed
   - Click "Deploy"
3. Your site will be built and deployed by Vercel

Alternatively, you can deploy directly using the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel
```

You can configure additional settings in the `vercel.json` file.
