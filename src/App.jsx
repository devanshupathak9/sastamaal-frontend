import { useState } from "react"
import "./App.css"
import { LocationContainer } from "./location_container"
import { SearchContainer } from "./search_container"

function App() {
  const [location, setLocation] = useState("")
  const [warnDismissed, setWarnDismissed] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Sastamaal</h1>
        <LocationContainer
          location={location}
          setLocation={setLocation}
        />
      </header>

      <SearchContainer />

      {!warnDismissed && (
        <div className="backend-warning">
          <span>⚠️ Backend is currently down — results are demo data only. Will be fixed soon!</span>
          <button className="warning-dismiss" onClick={() => setWarnDismissed(true)}>✕</button>
        </div>
      )}
    </div>
  )
}

export default App
