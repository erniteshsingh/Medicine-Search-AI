import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Camera,
  Sparkles,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  X,
} from "lucide-react";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
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
                  onClick={() => fileInputRef.current.click()}
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
    </div>
  );
};

export default Home;
