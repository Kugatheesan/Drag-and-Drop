// import React from "react";
import Sidebar from "./componts/Sidebar/sidebar";
import Dashboard from './componts/Dashboard/Dasboard';
import "./App.css";

const App = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
