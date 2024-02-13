import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Homepage/Home";
import Signup from "./Components/Loggings/Singup";
import Signin from "./Components/Loggings/Singin";
import Signout from "./Components/Loggings/Singout";
import Header from "./Components/Header";

import "./App.css";
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
