import React from 'react'
import MarketplaceCard from '../Components/MarketplaceCard'
import NavBar from '../Components/NavBar'

export default function Home() {
    return (
        <div className="Home">
          <NavBar/>  
          <MarketplaceCard />
        </div>
    )
}
