# 🛒 Sastamaal Frontend

**Sastamaal** is a React (Vite) based frontend application that enables users to search for products and compare prices across multiple quick-commerce platforms such as Blinkit, Zepto, and Instamart.

The application automatically detects the user's location using the browser's Geolocation API, converts coordinates into a human-readable address via OpenStreetMap, and uses this context for searches.

---

## 📍 Location Handling Logic

**On application load:**
- The app checks cookies for `lat`, `lon`, and `address`
- If not found, defaults to:
```json
{
    "lat": "28.4646148",
    "lon": "77.0299194",
    "address": "Gurgaon, Haryana, India"
}
```

**When "Get Location" is clicked:**
- Browser Geolocation API fetches latitude and longitude
- Reverse geocoding via OpenStreetMap: `https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}`
- Address saved to cookies and UI updates immediately

---