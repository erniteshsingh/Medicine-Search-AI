import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { GiPill } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <GiPill className="footer-pill-icon" />
            <span>
              MedInsight<span className="text-blue">AI</span>
            </span>
          </Link>
          <p className="footer-desc">
            Your trusted AI companion for understanding medicines and healthcare
            insights.
          </p>
          <div className="footer-socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaSquareXTwitter />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <IoLogoLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Platform</h4>
          <ul>
            <li>
              <Link to="/">Search Medicine</Link>
            </li>
            <li>
              <Link to="/history">Search History</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Get in Touch</h4>
          <p>
            <MdEmail size={18} /> support@medinsight.ai
          </p>
          <div className="disclaimer-box">
            <strong>Disclaimer:</strong> AI insights are for information only.
            Consult a doctor before use.
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} MedInsight AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
