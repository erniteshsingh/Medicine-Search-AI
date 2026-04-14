import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Pill,
  AlertCircle,
  ShieldAlert,
  Activity,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import "./Response.css";

const Response = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { searchQuery, imageFile } = location.state || {};

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!searchQuery && !imageFile) {
        setLoading(false);
        setError("No data found to analyze. Please try searching again.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        let response;

        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);
          response = await axios.post(
            "http://localhost:5000/api/v1/medicine/analyze-image",
            formData,
            {
              headers: {
                ...config.headers,
                "Content-Type": "multipart/form-data",
              },
            },
          );
        } else {
          response = await axios.post(
            "http://localhost:5000/api/v1/medicine/analyze-text",
            { text: searchQuery },
            config,
          );
          console.log("response from backend:", response);
        }

        if (response.data?.success) {
          setData(response.data.data);
        } else {
          setError(response.data?.message || "Analysis failed.");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message;

        if (err.response?.status === 429) {
          setError(
            errorMessage || "AI Limit Reached. Please try again in 30 seconds!",
          );
        } else {
          setError(
            errorMessage || "Server connection failed. Please try again later.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [searchQuery, imageFile]);

  if (loading) {
    return (
      <div className="loading-state">
        <Loader2 className="animate-spin" size={60} color="#3498db" />
        <h2>Analyzing Medicine...</h2>
        <p>Our AI is scanning medical databases for the most accurate info.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="error-state">
        <AlertCircle size={60} color="#e74c3c" />
        <h2>Analysis Failed</h2>
        <p className="error-msg">
          {error || "No response received from the server."}
        </p>
        <button className="back-btn-error" onClick={() => navigate("/")}>
          Go Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="response-page fade-up">
      <div className="response-container">
        <button className="back-link" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Back to Search
        </button>

        <header className="medicine-hero">
          <div className="medicine-icon-box">
            <Pill size={40} />
          </div>
          <div className="medicine-meta">
            <span className="pill-badge">AI Analysis Result</span>
            <h1>{data.name || "Unknown Medicine"}</h1>
            <p className="category-text">
              {data.category || "General Pharmacology"}
            </p>
          </div>
        </header>

        <div className="info-grid">
          <div className="info-card wide">
            <div className="card-header">
              <FileText size={20} className="icon-blue" />
              <h3>About this Medicine</h3>
            </div>
            <p>{data.description || "No description provided."}</p>
          </div>

          <div className="info-card">
            <div className="card-header">
              <Activity size={20} className="icon-green" />
              <h3>Therapeutic Uses</h3>
            </div>
            <ul className="check-list">
              {data.uses && data.uses.length > 0 ? (
                data.uses.map((use, i) => <li key={i}>{use}</li>)
              ) : (
                <li>Information not available</li>
              )}
            </ul>
          </div>

          <div className="info-card">
            <div className="card-header">
              <AlertCircle size={20} className="icon-orange" />
              <h3>Potential Side Effects</h3>
            </div>
            <div className="tags-container">
              {data.sideEffects && data.sideEffects.length > 0 ? (
                data.sideEffects.map((effect, i) => (
                  <span key={i} className="side-effect-tag">
                    {effect}
                  </span>
                ))
              ) : (
                <span className="side-effect-tag">None reported</span>
              )}
            </div>
          </div>

          <div className="info-card">
            <div className="card-header">
              <Clock size={20} className="icon-yellow" />
              <h3>General Dosage</h3>
            </div>
            <p>{data.dosage || "Consult your physician for exact dosage."}</p>
          </div>

          <div className="info-card warning-card">
            <div className="card-header">
              <ShieldAlert size={20} className="icon-red" />
              <h3>Safety Warnings</h3>
            </div>
            <div className="warnings-content">
              <div className="warning-box">
                <strong>Alcohol:</strong>
                <p>{data.warnings?.alcohol || "Not recommended"}</p>
              </div>
              <div className="warning-box">
                <strong>Pregnancy:</strong>
                <p>{data.warnings?.pregnancy || "Consult doctor before use"}</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="response-footer">
          <p>
            MedInsight AI: For informational purposes only.{" "}
            <strong>Always consult a medical professional.</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Response;
