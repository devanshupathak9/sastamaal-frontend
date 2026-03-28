import { useEffect, useState } from "react"
import SastamaalLogo from "./assets/sastamaal.svg"
import {
  getLocationFromCookie,
  setLocationCookie,
  reverseGeocode,
} from "./locationUtils"

export function LocationContainer({ location, setLocation }) {
  const [loading, setLoading] = useState(false)

  // Load location from cookies on mount
  useEffect(() => {
    const stored = getLocationFromCookie()

    if (stored) {
      setLocation(stored.address)
    } else {
      // default location
      const defaultLoc = {
        lat: "28.4646148",
        lon: "77.0299194",
        address: "Gurgaon, Haryana, India",
      }
      setLocationCookie(defaultLoc)
      setLocation(defaultLoc.address)
    }
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported")
      return
    }

    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        try {
          const address = await reverseGeocode(lat, lon)

          setLocationCookie({ lat, lon, address })
          setLocation(address)
        } catch (err) {
          alert("Failed to fetch address")
        } finally {
          setLoading(false)
        }
      },
      () => {
        alert("Permission denied")
        setLoading(false)
      }
    )
  }

  return (
    <div className="top-bar">
      <img src={SastamaalLogo} alt="Sastamaal" className="app-logo" />

      <div className="location-input-wrapper">
        <input
          type="text"
          value={location}
          readOnly
          className="location-input"
        />

        <button
          className="save-location"
          onClick={getCurrentLocation}
          disabled={loading}
        >
          {loading ? "Detecting..." : "Get Location"}
        </button>
      </div>
    </div>
  )
}
