import { Routes, Route } from 'react-router-dom';
import Home from "./pages/home"
import Rank from "./pages/Rank"
import Mypage from "./pages/Mypage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Write from "./pages/Write"
import TextDetail from "./pages/TextDetail"
import Map from "./pages/Map"

function App() {

  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      {/* <Home></Home> */}
      {/* <Map></Map> */}
      {/* <Rank></Rank> */}
      {/* <Login></Login> */}
      {/* <Signup></Signup> */}
      {/* <Mypage></Mypage> */}
      {/* <Write></Write> */}
      {/* <TextDetail></  TextDetail> */}
    </div>

  )
}

export default App
