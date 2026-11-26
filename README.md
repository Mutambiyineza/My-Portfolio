# DISMAS® Portfolio

Vite + React 19 + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

Replace `public/assets/dismas-portrait-placeholder.png` with your real portrait
(keep the same filename, or update the two `<img>` tags in `src/App.tsx`).

## Portfolio assistant

The floating portfolio assistant answers questions about Dismas and the projects
using the public details in `src/portfolio-data.ts`. Its server-side endpoint is
`api/chat.ts`; the OpenAI API key is never sent to the browser.

1. Add `OPENAI_API_KEY` to the Vercel project's Environment Variables for the
   environments where the site will run. Do not commit the key.
2. Deploy the project to Vercel. Vercel serves the Vite site and the `/api/chat`
   serverless function together.
3. For local end-to-end testing, link the project with the Vercel CLI, put the
   key in an ignored `.env.local` file, and run `vercel dev`; the regular Vite
   dev server does not run Vercel Functions.

Questions are sent to OpenAI to generate replies. The portfolio app does not
save chat history between page loads; avoid entering sensitive information.
