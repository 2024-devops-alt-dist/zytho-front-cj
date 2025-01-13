import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BeerList from './components/BeerList'

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      
      <div style={{ border: '2px solid red' }}>
        < BeerList />
      </div>
      
      <div>
        <Footer />
      </div>
    </>
  )
}

export default App
