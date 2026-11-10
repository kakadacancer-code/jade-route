# Jade Routes

A React and Vite travel frontend with an editorial jade palette, destination photography, and gentle scroll parallax. Browse seven sample journeys by category and open their day-by-day itineraries.

## Run on Ubuntu

With Node.js 18, 20, or 22+ and npm installed, open a terminal in the extracted `jade-routes` folder and run:

```sh
npm ci
npm run dev
```

Open the localhost URL Vite prints, usually http://localhost:5173.

## Production build

```sh
npm run build
npm run preview
```

Vite writes the static site to `dist/`. This frontend runs without a backend or API keys. Destination photos load from Unsplash; the original SVG landscapes remain as fallbacks if images fail. Photo credits are linked in the footer. Parallax and reveal animations respect the reduced-motion setting.

## Edit the project

- `src/main.jsx` contains the page, filters, itinerary dialog, and motion hooks.
- `src/tours.js` contains the example itineraries.
- `src/Scene.jsx` contains destination photography and the layered SVG fallback artwork.
- `src/styles.css` contains the responsive layout, transitions, parallax styling, and reduced-motion rules.

## Journey tools

Search by destination, landscape, or Chinese place name. Category filters and the saved-only view work together. Hearts save journeys in browser local storage, with an in-memory fallback when storage is blocked. Open “Refine collection” to search, show saved journeys, or enable the comparison checkboxes. Download a plain-text itinerary from its dialog. Favorites stay on the current device and browser.

The hero landscape selector previews three featured landscapes. A bilingual “中国热门目的地 / Popular places in China” section features six destinations, with Chinese landmark names and descriptions; every place opens its itinerary. The mobile menu supports Escape to close. FAQ answers use native expandable details. All added tools use the existing jade palette and responsive layouts.

Run the search and storage checks with `npm test`.
