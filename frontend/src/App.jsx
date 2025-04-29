import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home"
import Rank from "./pages/Rank"
import Signup from './pages/Signup'
import Login from './pages/Login'
import TextDetail from "./pages/TextDetail"
import Write from "./pages/Write"
import Mypage from "./pages/Mypage"

function App() {

  return (
      <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rank" element={<Rank />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/write" element={<Write />} />
              <Route path="/textDetail" element={<TextDetail />} />
            </Routes>
      </Router>
  )
}

export default App
