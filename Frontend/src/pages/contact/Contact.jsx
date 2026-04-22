import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, User, Send, CheckCircle } from "lucide-react";
import axios from "axios";
import "./Contact.css";
import API_URL from "../../apiConfig";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    issue: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/support/contact`,
        formData,
      );

      if (response.data.success) {
        setStatus({
          type: "success",
          msg: "Message sent! We will contact you soon.",
        });
        setFormData({ name: "", phone: "", issue: "" });

        // Message ko 4 second baad hide karne ke liye
        setTimeout(() => {
          setStatus({ type: "", msg: "" });
        }, 4000);
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <header className="contact-header">
          <h1>Contact Support</h1>
          <p>Facing an issue? Let us know, and we'll help you out.</p>
        </header>

        <form className="contact-form" onSubmit={handleSubmit}>
          {status.msg && (
            <div className={`status-alert ${status.type}`}>
              {status.type === "success" && <CheckCircle size={18} />}
              <span>{status.msg}</span>
            </div>
          )}

          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <Phone size={18} className="input-icon" />
              <input
                type="tel"
                placeholder="Enter 10-digit number"
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Describe your problem</label>
            <div className="input-wrapper">
              <MessageSquare size={18} className="input-icon textarea-icon" />
              <textarea
                placeholder="What issue are you facing?"
                value={formData.issue}
                onChange={(e) =>
                  setFormData({ ...formData, issue: e.target.value })
                }
                required
              ></textarea>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
            {!loading && <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
