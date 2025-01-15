import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BeerList from './pages/BeerList'
import { Routes, Route } from 'react-router'
import BeerDetail from './pages/BeerDetail'
import BreweryList from './pages/BreweryList'

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
    </Routes>
      
    <div>
        <Footer />
    </div> 
    </>
  )
}

export default App
