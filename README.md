# Sastamaal Frontend

**Sastamaal** is a React (Vite) based frontend that lets users search for products and compare prices across quick-commerce platforms — Blinkit, Zepto, and Instamart — side by side.

The app automatically detects the user's location via the browser Geolocation API, reverse-geocodes it using OpenStreetMap, and stores it in cookies for subsequent searches.

**Live app:** https://sastamaal.vercel.app

---

## Features

- Side-by-side price comparison across Blinkit, Zepto, and Instamart
- Automatic location detection with fallback to Gurgaon, Haryana
- Skeleton loading animation while fetching results
- Platform-specific colour-coded result columns
- Enter key support in the search box
- Responsive layout (mobile-friendly)

---

## Location Handling

**On load:**
- App reads `lat`, `lon`, `address` from cookies
- If absent, defaults to:
```json
{
  "lat": "28.4646148",
  "lon": "77.0299194",
  "address": "Gurgaon, Haryana, India"
}
```

**When "Get Location" is clicked:**
- Browser Geolocation API fetches coordinates
- Reverse geocoding via OpenStreetMap Nominatim:
  `https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}`
- Result saved to cookies (1-year expiry)

---

## Backend Integration

The search currently uses `fakeSearchApi()` (demo data with a 2 s delay).

When the backend is ready, switch to `realSearchApi()` in `search_container.jsx`:
1. Set `SEARCH_API_URL` to your backend endpoint
2. Replace `fakeSearchApi(query)` with `realSearchApi(query)` in `handleSearch`

Expected backend response format:
```json
[
  {
    "provider": "Blinkit",
    "items": [
      { "name": "...", "price": "₹99", "offerPrice": "₹79", "Image": "..." }
    ]
  },
  { "provider": "Zepto", "items": [...] },
  { "provider": "Instamart", "items": [...] }
]
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | CSS (no library) |
| Location | Browser Geolocation API |
| Geocoding | OpenStreetMap Nominatim |
| Hosting | Vercel |

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

```bash
npm run build   # production build → dist/
```
