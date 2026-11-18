# Jade Routes

A bilingual React and Vite travel planner for independent journeys through China. Browse eight sample routes, compare them by season and estimated budget, and build a printable trip plan.

## Run locally

Use Node.js 20 or newer.

```sh
npm ci
npm run dev
```

## Build and test

```sh
npm test
npm run build
npm run preview
```

The production build is written to `dist/`. Configure static hosting to serve `index.html` for client-side routes such as `/journey/li-river` and `/plan/print`. The app displays its own 404 page for unknown routes.

## Travel tools

- Search for English or Chinese destination names. Use travel month, group size, category, and duration filters, then sort by popularity, duration, or price.
- Browse **All places** for 68 destinations. Search in either language and combine region, type, and UNESCO filters. Month suggestions are seasonal guidance. Directory photos are bundled as WebP files under `public/places/` with individual Wikimedia Commons credits.
- Open a dedicated journey page for photos, suggested daily stops, and a sample budget breakdown. The **Quick preview** action opens a shorter dialog.
- Use **Plan this trip** to prefill the planner. A saved plan includes departure and end dates, a countdown, and a group estimate. On the print page, select **Print / Save as PDF** and use your browser’s PDF destination if you want a file.
- The browser stores favorites, a single trip plan, and language, theme, and layout preferences on the current device. The newsletter is a local demo and stores the email in the same browser.

Prices, ratings, review counts, and testimonials are illustrative. Destination photographs load from Unsplash and link to their sources from the journey galleries. The landscape illustrations are used while loading and if a photo fails.

## Source layout

```text
public/
  favicon.svg
  places/               Destination photos served directly by Vite
src/
  main.jsx              React entry point
  app/                  Routes, shared state, and app context
  components/           Site navigation and shared landscape rendering
  features/
    home/               Hero, search, collection, and homepage sections
    journeys/           Journey cards, detail pages, data, and tests
    places/             Destination directory, visit guides, photos, and tests
    planner/            Trip planner and printable itinerary
  i18n/                 English and Simplified Chinese interface copy
  lib/                  Browser preference storage
  styles/               Global theme, layout, and print styles
```

Keep feature-specific data, styles, and tests with their feature. Use `components/` and `lib/` for code shared across features.
