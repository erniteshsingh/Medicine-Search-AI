import React, { useEffect } from "react";
import { ShieldCheck, EyeOff, Lock, Database, UserCheck } from "lucide-react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-wrapper">
      <div className="policy-container">
        <header className="policy-header">
          <div className="policy-badge">
            <ShieldCheck size={16} />
            <span>Privacy First</span>
          </div>
          <h1>Privacy Policy</h1>
          <p>Last updated: April 2026</p>
        </header>

        <section className="policy-section">
          <div className="section-title">
            <Database size={22} />
            <h2>Information We Collect</h2>
          </div>
          <p>
            When you use MedInsightAI, we collect minimal data to provide
            accurate medical analysis. This includes the medicine names you
            search for and the images you upload for AI analysis. We do not
            collect personal health records without your consent.
          </p>
        </section>

        <section className="policy-section">
          <div className="section-title">
            <Lock size={22} />
            <h2>Data Security</h2>
          </div>
          <p>
            Your scan history and profile data are encrypted using
            industry-standard protocols. We use JWT (JSON Web Tokens) to ensure
            that only you can access your private medical history. Your uploaded
            images are processed securely and are not shared with third-party
            advertisers.
          </p>
        </section>

        <section className="policy-section">
          <div className="section-title">
            <EyeOff size={22} />
            <h2>Usage of AI Analysis</h2>
          </div>
          <p>
            Our AI model analyzes medicine compositions to provide informational
            insights. This data is used to improve the accuracy of our
            predictions. Important: The information provided is for educational
            purposes and is not a substitute for professional medical advice.
          </p>
        </section>

        <section className="policy-section">
          <div className="section-title">
            <UserCheck size={22} />
            <h2>User Rights</h2>
          </div>
          <p>
            You have the right to view, download, or delete your entire medical
            history from our servers at any time. We believe in complete
            transparency regarding how your data is stored and utilized.
          </p>
        </section>

        <footer className="policy-footer">
          <p>
            Questions about our Privacy Policy? Contact us at
            <strong> privacy@medinsightai.com</strong>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
