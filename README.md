<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">A powerful starter template combining Next.js and Supabase for building modern web applications</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#prerequisites"><strong>Prerequisites</strong></a> ·
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#deployment"><strong>Deployment</strong></a> ·
  <a href="#support"><strong>Support</strong></a>
</p>
<br/>

## About The Project

This starter kit provides a production-ready foundation for building full-stack applications using Next.js and Supabase. It includes authentication, real-time data synchronization, and a modern UI toolkit out of the box.

## Features

- 🚀 **Full Stack Solution** - Seamlessly works across the entire Next.js stack including App Router, Pages Router, Middleware, Client and Server components
- 🔐 **Authentication Ready** - Includes Supabase Auth with cookie-based session management
- 💅 **Modern Styling** - Pre-configured with Tailwind CSS for utility-first styling
- 🎨 **UI Components** - Beautiful, accessible components powered by shadcn/ui
- 🔄 **Real-time Data** - Built-in real-time capabilities with Supabase
- 📱 **Responsive Design** - Mobile-first approach ensuring great UX across all devices
- 🚀 **One-Click Deploy** - Easy deployment to Vercel with environment variables auto-configuration

## Demo

Experience the starter kit in action at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Prerequisites

- Node.js 16+
- npm/yarn/pnpm
- A Supabase account
- Git

## Getting Started

1. Create a Supabase project at [database.new](https://database.new)

2. Clone the starter using your preferred package manager:

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   # or
   yarn create next-app --example with-supabase with-supabase-app
   # or
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Navigate to project directory:
   ```bash
   cd with-supabase-app
   ```

4. Set up environment variables:
   - Rename `.env.example` to `.env.local`
   - Update with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=[YOUR_SUPABASE_PROJECT_URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_SUPABASE_ANON_KEY]
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Your app should now be running on [localhost:3000](http://localhost:3000/)

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The deployment will automatically configure your environment variables through the Supabase integration.

## Support

For issues and feedback:
- Open an issue on the [Supabase GitHub repo](https://github.com/supabase/supabase/issues/new/choose)
- Join the [Supabase Discord](https://discord.supabase.com)
- Check out the [documentation](https://supabase.com/docs)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## More Examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
