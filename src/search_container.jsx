import { useState } from "react"
import "./App.css"

export function SearchContainer() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setResults(null)

    try {
      const data = await fakeSearchApi(query)
      setResults(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="search-container">
      <div className="search-form">
        <p className="search-title">
          Compare prices across Blinkit, Zepto &amp; Instamart
        </p>

        <input
          className="search-input"
          type="text"
          placeholder="Search for milk, eggs, atta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          className="search-button"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      <ResultsContainer isLoading={isLoading} results={results} />
    </div>
  )
}

function ResultsContainer({ isLoading, results }) {
    if (isLoading) {
      return (
        <div className="results">
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
          <SkeletonColumn />
        </div>
      )
    }
  
    if (!results) return null
  
    return (
      <div className="results">
        {results.map((provider) => (
          <ProviderColumn
            key={provider.provider}
            provider={provider.provider}
            items={provider.items}
          />
        ))}
      </div>
    )
  }
  
function ProviderColumn({ provider, items }) {
return (
    <div className="provider-column" data-provider={provider}>
    <div className="provider-header">
      <h3 className="provider-title">{provider}</h3>
    </div>
    <div className="provider-items">
      {items.map((item, index) => (
          <ProductCard key={index} item={item} />
      ))}
    </div>
    </div>
)
}
  
function ProductCard({ item }) {
return (
    <div className="product-card">
    <img src={item.Image} alt={item.name} />

    <div className="product-info">
        <p className="product-name">{item.name}</p>
        <p className="product-price">{item.offerPrice}</p>
        <p className="product-mrp">MRP {item.price}</p>
    </div>
    </div>
)
}
  
function SkeletonColumn() {
    return (
        <div className="provider-column">
        <div className="provider-title skeleton-text"></div>
        <div className="product-card skeleton"></div>
        <div className="product-card skeleton"></div>
        <div className="product-card skeleton"></div>
        </div>
    )
}

  
function fakeSearchApi(query) {
    const sampleItems = [
        {
        Image:
            "https://cdn.grofers.com/da/cms-assets/cms/product/7edaeb57-75cc-4c04-a990-f44b4272804e.png",
        name:
            "Damensch Ultralight Cotton Solid Inner Boxers (Havana Blue)",
        price: "₹499",
        offerPrice: "₹389",
        },
        {
        Image:
            "https://cdn.grofers.com/da/cms-assets/cms/product/1920c242c043472ba42dd338908c1723.png",
        name:
            "Pepe Jeans Innerfashion Printed Men's Boxers (Blue)",
        price: "₹549",
        offerPrice: "₹399",
        },
        {
        Image:
            "https://cdn.grofers.com/da/cms-assets/cms/product/8c513a7a-029a-461f-a88c-4f2b52ffc0dd.png",
        name:
            "Damensch Breeze Men's Ultra-Light Cotton Boxers Shorts (Black)",
        price: "₹599",
        offerPrice: "₹497",
        },
    ]

    return new Promise((resolve) => {
        setTimeout(() => {
        resolve([
            { provider: "Blinkit", items: sampleItems },
            { provider: "Zepto", items: sampleItems },
            { provider: "Instamart", items: sampleItems },
            // { provider: "BigBasket", items: sampleItems },
            // { provider: "DMart", items: sampleItems },
            // { provider: "AmazonFresh", items: sampleItems },
        ])
        }, 2000)
    })
}
  
// 🔥 REAL BACKEND API CALL (enable later)
async function realSearchApi(query) {
    const response = await fetch(SEARCH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
        // later add:
        // lat,
        // lon,
      }),
    })
  
    if (!response.ok) {
      throw new Error("API request failed")
    }
  
    const data = await response.json()
  
    /**
     * Expected backend response format:
     * [
     *   {
     *     provider: "Blinkit",
     *     items: [...]
     *   },
     *   {
     *     provider: "Zepto",
     *     items: [...]
     *   }
     * ]
     */
  
    return data
  }
  