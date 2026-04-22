import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Camera,
  Sparkles,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Home.css";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleActionClick = () => {
    if (!isAuthenticated) {
      setShowSignup(true);
      return false;
    }
    return true;
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!handleActionClick()) return;
    if (!query.trim() && !selectedImage) return;

    navigate("/result", {
      state: {
        searchQuery: query,
        imageFile: selectedImage,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setQuery("");
    }
  };

  return (
    <div className="home-container">
      <div className="bg-blur-circle-1"></div>
      <div className="bg-blur-circle-2"></div>

      <section className={`hero-section ${isVisible ? "fade-up" : ""}`}>
        <div className="hero-content">
          <div className="ai-badge">
            <Sparkles size={16} className="sparkle-icon" />
            <span>Next-Gen Medical AI</span>
          </div>

          <h1 className="hero-title">
            Your Personal <span className="text-gradient">AI Pharmacist</span>{" "}
            <br /> Available 24/7.
          </h1>

          <p className="hero-subtitle">
            Instant insights on 10,000+ medicines. Just scan or type to
            understand dosage, side effects, and safety warnings.
          </p>

          <form className="search-container-premium" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder={
                  selectedImage
                    ? "Image selected - click analyze"
                    : "Type medicine name..."
                }
                value={query}
                onFocus={handleActionClick}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value) setSelectedImage(null);
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
              />

              <div className="input-actions">
                <button
                  type="button"
                  className={`camera-btn-premium ${selectedImage ? "active-upload" : ""}`}
                  onClick={() => {
                    if (handleActionClick()) {
                      fileInputRef.current.click();
                    }
                  }}
                >
                  {selectedImage ? (
                    <ImageIcon size={22} color="#2ecc71" />
                  ) : (
                    <Camera size={22} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="search-btn-premium">
              <Zap size={18} fill="white" />
              <span>Analyze Now</span>
            </button>
          </form>

          {selectedImage && (
            <div className="file-preview-container">
              <p className="file-preview-text">
                Image: <strong>{selectedImage.name}</strong>
              </p>
              <button
                className="remove-file"
                onClick={() => setSelectedImage(null)}
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="trust-indicators">
            <div className="trust-item">
              <ShieldCheck size={18} /> Verified Info
            </div>
            <div className="trust-item">
              <Zap size={18} /> Instant Results
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default Home;
