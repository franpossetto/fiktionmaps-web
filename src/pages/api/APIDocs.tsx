import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./APIDocs.css";
import Navbar from "../../components/shared/NavBar/NavBar";
import { SideBar } from "../../components/shared/SideBar/SideBar";

const handleHomeClick = () => {
  console.log("Home clicked");
};

const handleLoginClick = () => {
  console.log("Login clicked");
};

const handleSignupClick = () => {
  console.log("Signup clicked");
};

const APIDocs = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    console.log("toque");
    setIsCollapsed((prevState) => !prevState);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar isCollap={isCollapsed} />
        <div className="col no-padding" onClick={toggleSidebar}>
          <Navbar
            onHomeClick={handleHomeClick}
            onLoginClick={handleLoginClick}
            onSignupClick={handleSignupClick}
          />
          <div style={{ width: "80%" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocs;
