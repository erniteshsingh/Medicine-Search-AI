import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Pill, Menu, X, Home, History } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isAuthenticated } = useAuth();

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            <Pill className="logo-icon-svg" size={24} />
            <span className="logo-text">
              MedInsight<span className="text-blue">AI</span>
            </span>
          </Link>

          <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </div>

          <div
            className={`nav-overlay ${isOpen ? "active" : ""}`}
            onClick={closeMobileMenu}
          ></div>

          <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-links" + (isActive ? " active-link" : "")
                }
                onClick={closeMobileMenu}
              >
                <Home size={18} className="mobile-icon" />
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
                <History size={18} className="mobile-icon" />
                History
              </NavLink>
            </li>

            {isAuthenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    "nav-links profile-nav-link" +
                    (isActive ? " active-link" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  <CgProfile size={22} className="profile-logo-icon" />
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn-login-premium"
                  onClick={() => {
                    setShowLogin(true);
                    closeMobileMenu();
                  }}
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        switchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <Signup
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        switchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default Navbar;
