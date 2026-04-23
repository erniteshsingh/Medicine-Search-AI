import React, { useState, useEffect } from "react";
import { X, Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import googleicon from "../../assets/googleicon.svg";
import "./Login.css";

const Login = ({ isOpen, onClose, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login({ email, password });

    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>Welcome Back</h2>
          <p>Login to your MedInsight account</p>
        </div>

        {error && (
          <p
            className="error-message"
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "0.85rem",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          <img src={googleicon} alt="Google" className="google-icon-img" />
          Continue with Google
        </button>

        <p className="toggle-auth">
          Don't have an account? <span onClick={switchToSignup}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
