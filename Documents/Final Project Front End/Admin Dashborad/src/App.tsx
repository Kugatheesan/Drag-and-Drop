import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./componts/Sidebar";
import Users from "./componts/Users";
import Bookings from "./componts/Booking";
import Events from "./componts/Events";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
