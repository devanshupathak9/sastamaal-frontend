import { useState } from "react"
import "./App.css"
import { LocationContainer } from "./location_container"
import { SearchContainer } from "./search_container"

function App() {
  const [location, setLocation] = useState("")

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
    </div>
  )
}

export default App
