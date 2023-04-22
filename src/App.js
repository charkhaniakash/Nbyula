import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Archive from "./components/archive/Archive";
import Interest from "./components/interest/Interest";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import Banner from "./components/banner/Banner";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Banner/> */}
        <Routes>
          <Route path="/" element={<Banner/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/interest" element={<Interest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
