import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Rank from "./pages/Rank"
import Signup from './pages/Signup'
import Login from './pages/Login'
import TextDetail from "./pages/TextDetail"
import Map from "./pages/Map"
import InfoDetail from './pages/InfoDetail';
import Write from "@/pages/Write.jsx";
import Mypage from "@/pages/Mypage.jsx";

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
                <Route path="/infoDetail" element={<InfoDetail />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </Router>
    )
}

export default App