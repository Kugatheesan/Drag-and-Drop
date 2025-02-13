// import React from "react";
import "./sidebar.css";

function Sidebar()  {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Apex Admin</h2>
      <ul className="sidebar-menu">
        <li className="active">Dashboard</li>
        <li>Events</li>
        <li>Users</li>
        <li>Booking</li>
        <li>Analytics</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
