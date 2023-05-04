import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onHomeClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onHomeClick,
  onLoginClick,
  onSignupClick,
}) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          paddingTop: 20,
          paddingBottom: 10,
          borderBottom: "1px solid #252527",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-8"></div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <Link to={"/"} className="item-list">
                <button onClick={onHomeClick}>Home</button>
              </Link>
              <Link to={"/login"} className="item-list">
                <button onClick={onLoginClick}>Login</button>
              </Link>
              <Link to={"/signup"} className="item-list">
                <button onClick={onSignupClick}>Signup</button>
              </Link>
              <Link to={"/search"} className="item-list">
                <button onClick={onSignupClick}>Map</button>
              </Link>
              <Link to={"/explore"} className="item-list">
                <button onClick={onSignupClick}>Cards</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
