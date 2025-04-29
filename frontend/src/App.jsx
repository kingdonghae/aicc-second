import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home"
import Rank from "./pages/Rank"
import Mypage from "./pages/Mypage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Write from "./pages/Write"
import TextDetail from "./pages/TextDetail"

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
