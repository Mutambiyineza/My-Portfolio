# DISMAS® Portfolio

Vite + React 19 + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

Replace `public/assets/dismas-portrait-placeholder.png` with your real portrait
(keep the same filename, or update the two `<img>` tags in `src/App.tsx`).

## Portfolio FAQ guide

The floating portfolio guide uses saved questions and answers from the CV and
the portfolio data in `src/portfolio-data.ts`. It runs entirely in the browser,
does not contact an external service, and works without a network connection.

Add project-specific answers to that project's `faqs` array:

```ts
faqs: [
  { question: 'What was the main design challenge?', answer: 'Your verified answer.' },
]
```

Common questions about Dismas are in the `portfolioFaqs` list in
`src/portfolio-data.ts`. Update the question, matching phrases, and answer
together when adding or correcting an FAQ. Answers are curated and do not
depend on an external service.
