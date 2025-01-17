import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BeerList from './pages/BeerList'
import { Routes, Route } from 'react-router'
import BeerDetail from './pages/BeerDetail'
import BreweryList from './pages/BreweryList'
import BreweryDetails from './pages/BreweryDetails'
import HomePage from './pages/HomePage'
import Login from './pages/Login'

function App() {
  return (
    <>
    <div className="page-container">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Routes */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers" element={<BeerList />} />
          <Route path="/beers/:id" element={<BeerDetail />} />
          <Route path="/breweries" element={<BreweryList />} />
          <Route path="/breweries/:id" element={<BreweryDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App
