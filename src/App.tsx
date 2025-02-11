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
import Registration from './pages/Registration'
import Profil from './pages/Profil'
import { AuthProvider } from './context/AuthContext'
import BeerEdit from './crud/beer/BeerEdit'

function App() {
  return (
    <>
    <AuthProvider>
    <div className="page-container">
      <div>
        <Navbar />
      </div>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers" element={<BeerList />} />
          <Route path="/beers/:id" element={<BeerDetail />} />
          <Route path="/beers/:id/edit" element={<BeerEdit />} />
          <Route path="/breweries" element={<BreweryList />} />
          <Route path="/breweries/:id" element={<BreweryDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<Registration />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>
    </div>
    </AuthProvider>
    </>
  )
}

export default App
