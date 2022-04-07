// router imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// react-redux
import { useSelector } from "react-redux";

// react
import { useEffect, useState } from "react";

// component imports
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Nav from "../components/Nav/Nav";
import NavSignedOut from "../components/Nav/NavSignedOut";
import Home from "../components/Home/Home";

function App() {
  let loggedIn = useSelector((state) => state.login.loggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(loggedIn);
  });

  return (
    <Router>
      {isLoggedIn ? <Nav /> : <NavSignedOut />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
