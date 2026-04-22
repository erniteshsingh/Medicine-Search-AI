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

 
  const parseAIResponse = (rawText) => {
    const sections = {
      name: "Unknown Medicine",
      category: "General Pharmacology",
      description: "",
      uses: [],
      sideEffects: [],
      dosage: "",
      warnings: { alcohol: "", pregnancy: "" },
    };

   
    const brandMatch = rawText.match(/-- Brand Name: (.*)/);
    const saltMatch = rawText.match(/-- Generic Salt: (.*)/);
    if (brandMatch) sections.name = brandMatch[1].trim();
    if (saltMatch) sections.category = saltMatch[1].trim();

    
    const mechMatch = rawText.match(/-- Mechanism of Action: (.*)/);
    if (mechMatch) sections.description = mechMatch[1].trim();

    const usesMatch = rawText.match(
      /I\. THERAPEUTIC INDICATIONS \(USES\)([\s\S]*?)II\./,
    );
    if (usesMatch) {
      sections.uses = usesMatch[1]
        .split("--")
        .filter(
          (line) =>
            line.trim() &&
            !line.includes("Primary:") &&
            !line.includes("Secondary:"),
        )
        .map((l) => l.trim());
     
      const primary = usesMatch[1].match(/-- Primary: (.*)/);
      if (primary) sections.uses.unshift(primary[1].trim());
    }

    const sideMatch = rawText.match(/-- Common: (.*)/);
    if (sideMatch)
      sections.sideEffects = sideMatch[1].split(",").map((e) => e.trim());

   
    const doseMatch = rawText.match(
      /III\. DOSAGE & ADMINISTRATION([\s\S]*?)IV\./,
    );
    if (doseMatch) sections.dosage = doseMatch[1].replace(/--/g, "").trim();

   
    const alcoholMatch = rawText.match(/-- Alcohol: (.*)/);
    const pregMatch = rawText.match(/-- Pregnancy: (.*)/);
    if (alcoholMatch) sections.warnings.alcohol = alcoholMatch[1].trim();
    if (pregMatch) sections.warnings.pregnancy = pregMatch[1].trim();

    return sections;
  };

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
        }

        if (response.data?.success) {
         
          const rawString =
            typeof response.data.data === "string"
              ? response.data.data
              : response.data.data.response; 

          const structuredData = parseAIResponse(rawString);
          setData(structuredData);
        } else {
          setError(response.data?.message || "Analysis failed.");
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message;
        setError(errorMessage || "Server connection failed.");
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
        <p className="error-msg">{error}</p>
        <button className="back-btn-error" onClick={() => navigate("/")}>
          Go Back
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
            <h1>{data.name}</h1>
            <p className="category-text">{data.category}</p>
          </div>
        </header>

        <div className="info-grid">
          <div className="info-card wide">
            <div className="card-header">
              <FileText size={20} className="icon-blue" />
              <h3>Mechanism of Action</h3>
            </div>
            <p>{data.description || "Description not available."}</p>
          </div>

          <div className="info-card">
            <div className="card-header">
              <Activity size={20} className="icon-green" />
              <h3>Therapeutic Uses</h3>
            </div>
            <ul className="check-list">
              {data.uses.length > 0 ? (
                data.uses.map((use, i) => <li key={i}>{use}</li>)
              ) : (
                <li>Refer to prescription</li>
              )}
            </ul>
          </div>

          <div className="info-card">
            <div className="card-header">
              <AlertCircle size={20} className="icon-orange" />
              <h3>Common Side Effects</h3>
            </div>
            <div className="tags-container">
              {data.sideEffects.map((effect, i) => (
                <span key={i} className="side-effect-tag">
                  {effect}
                </span>
              ))}
            </div>
          </div>

          <div className="info-card">
            <div className="card-header">
              <Clock size={20} className="icon-yellow" />
              <h3>Usage Guide</h3>
            </div>
            <p style={{ whiteSpace: "pre-line" }}>{data.dosage}</p>
          </div>

          <div className="info-card warning-card">
            <div className="card-header">
              <ShieldAlert size={20} className="icon-red" />
              <h3>Safety Warnings</h3>
            </div>
            <div className="warnings-content">
              <div className="warning-box">
                <strong>Alcohol:</strong>
                <p>{data.warnings.alcohol}</p>
              </div>
              <div className="warning-box">
                <strong>Pregnancy:</strong>
                <p>{data.warnings.pregnancy}</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="response-footer">
          <p>
            MedInsight AI: For informational purposes only. Always consult a
            doctor.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Response;
