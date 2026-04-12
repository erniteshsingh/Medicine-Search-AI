import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Pill, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { isAuthenticated } = useAuth();

  const closeMobileMenu = () => setIsOpen(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
    closeMobileMenu();
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
    closeMobileMenu();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            <Pill className="logo-icon-svg" size={28} />
            <span className="logo-text">
              MedInsight<span className="text-blue">AI</span>
            </span>
          </Link>

          <div className="nav-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active-link" : "")
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active-link" : "")
                }
                onClick={closeMobileMenu}
              >
                History
              </NavLink>
            </li>

            {isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className="profile-icon-link"
                  onClick={closeMobileMenu}
                  title="View Profile"
                >
                  <CgProfile size={32} className="profile-icon-svg" />
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button className="nav-btn-login" onClick={openLogin}>
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        switchToSignup={openSignup}
      />
      <Signup
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        switchToLogin={openLogin}
      />
    </>
  );
};

export default Navbar;
