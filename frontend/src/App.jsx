import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home"
import Rank from "./pages/Rank"
import Signup from './pages/Signup'
import Login from './pages/Signup'

function App() {

  return (
      <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
      </Router>
  )
}

export default App
