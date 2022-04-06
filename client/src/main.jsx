import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import App from "./App";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
