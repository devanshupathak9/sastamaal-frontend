# Sastamaal Frontend

**Sastamaal** is a React (Vite) based frontend that lets users search for products and compare prices across quick-commerce platforms — Blinkit, Zepto, and Instamart — side by side.

**Live app:** https://sastamaal.vercel.app

---

## Architecture

```
src/
  App.jsx                — root component; holds location state; renders header + SearchContainer
  location_container.jsx — sticky header: app logo + location input + "Get Location" button
  search_container.jsx   — search input, results grid, and all sub-components
  locationUtils.jsx      — cookie helpers (get/set) and OpenStreetMap reverse-geocode call
  App.css                — all styles (header, search, provider columns, product cards, skeleton)
  index.css              — global reset and base typography
```

---

## Location Handling

**On load:**
- Reads `lat`, `lon`, `address` from cookies
- Falls back to Gurgaon, Haryana (`28.4646148`, `77.0299194`) if absent

**"Get Location" click:**
- Browser Geolocation API → reverse geocode via OpenStreetMap Nominatim
- Saves to cookies (1-year expiry), updates UI immediately

---

## Search & Backend Integration

`search_container.jsx` has two API functions:

| Function | Purpose |
|---|---|
| `fakeSearchApi(query)` | **Currently active.** Returns demo data after a 2 s delay. |
| `realSearchApi(query)` | Ready but unused. Set `SEARCH_API_URL` and swap in `handleSearch` when backend is live. |

To activate the real backend:
1. Define `const SEARCH_API_URL = "https://your-api.example.com/search"` at the top of `search_container.jsx`
2. In `handleSearch`, replace `fakeSearchApi(query)` → `realSearchApi(query)`

Expected backend response:
```json
[
  { "provider": "Blinkit", "items": [{ "name": "", "price": "₹99", "offerPrice": "₹79", "Image": "" }] },
  { "provider": "Zepto",   "items": [...] },
  { "provider": "Instamart", "items": [...] }
]
```

---

## Provider Column Styling

Each platform column is colour-coded via CSS `[data-provider]` attribute selectors in `App.css`:

| Platform | Colour |
|---|---|
| Blinkit | Yellow `#f7c32e` |
| Zepto | Purple `#6c3fc5` |
| Instamart | Orange `#f97316` |
| BigBasket | Green `#15803d` (ready to add) |

To add a new provider, just add a new `data-provider` block in `App.css` — no JS changes needed.

---

## Key Decisions & Notes

- `index.css` is now imported in `main.jsx` (it was commented out before — the dark Vite default conflicted with the light app theme)
- `src/Untitled` is a stale duplicate of `locationUtils.jsx` — safe to delete
- `onSearch` / `isSearching` props previously passed from `App` to `SearchContainer` were unused; they have been removed; `SearchContainer` manages its own loading state
- Vite base path is `/sastamaal/` (was `/SastaKart/`)
