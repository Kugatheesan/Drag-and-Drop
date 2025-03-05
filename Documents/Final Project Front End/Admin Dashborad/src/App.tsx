import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./componts/Sidebar";
import Users from "./componts/Users";
import Bookings from "./componts/Booking";
import Events from "./componts/Events";
import Login from "./componts/login";
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/users" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/" />} />
            <Route path="/bookings" element={isAuthenticated ? <Bookings /> : <Navigate to="/" />} />
            <Route path="/events" element={isAuthenticated ? <Events /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;





