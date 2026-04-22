import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, User, Send, CheckCircle } from "lucide-react";
import axios from "axios";
import "./Contact.css";

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
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/support/contact",
        formData,
      );
      if (response.data.success) {
        setStatus({
          type: "success",
          msg: "Message sent! We will contact you soon.",
        });
        setFormData({ name: "", phone: "", issue: "" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Something went wrong. Try again." });
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
              {status.msg}
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
