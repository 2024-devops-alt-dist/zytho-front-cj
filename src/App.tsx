import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BeerList from './pages/BeerList'
import { Routes, Route } from 'react-router'
import BeerDetail from './pages/BeerDetail'
import BreweryList from './pages/BreweryList'
import BreweryDetails from './pages/BreweryDetails'

function App() {
  return (
    <>
    <div>
        <Navbar />
    </div>

    <Routes>
      <Route path="/" element={<BeerList />} />
      <Route path="/beers/:id" element={<BeerDetail />} />
      <Route path="/breweries" element={<BreweryList />} />
      <Route path="/breweries/:id" element={<BreweryDetails />} />

    </Routes>
      
    <div>
        <Footer />
    </div> 
    </>
  )
}

export default App
