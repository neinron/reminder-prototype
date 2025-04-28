# Reminder Prototype

A Next.js-based web application for collecting license plate reminders and contact information. Users can submit their license plate and preferred contact channel (SMS/WhatsApp), and the data is managed via Supabase.

## Features
- Modern UI with Tailwind CSS
- License plate input with validation
- Contact channel selection (SMS, WhatsApp)
- Data persistence via Supabase
- GDPR and Impressum pages included

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
yarn install
   ```

2. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` (if available) or create `.env.local` manually.
   - Add your Supabase credentials:
     ```env
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/app/` — Main Next.js app directory
- `src/app/components/ui/` — UI components (Button, Input, Checkbox, etc.)
- `src/lib/` — Utility and Supabase client
- `public/` — Static assets

## Deployment
You can deploy this app to Vercel or any platform supporting Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## License
MIT

---

*Made with ❤️ using Next.js, Tailwind CSS, and Supabase.*
