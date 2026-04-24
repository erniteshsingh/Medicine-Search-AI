import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Activity, Shield, Save, X } from "lucide-react";
import axios from "axios";
import "./Profile.css";
import API_URL from "../../apiConfig";

const Profile = () => {
  const { user, logoutUser, setUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        `${API_URL}/api/v1/profile/update`,
        formData,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        if (typeof setUser === "function") {
          setUser(response.data.user);
        }

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <p>Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-status">MedInsight Member</p>
        </div>

        <form onSubmit={handleUpdate} className="profile-body">
          <div className="info-item">
            <div className="info-icon">
              <User size={20} />
            </div>

            <div className="info-text">
              <label>Full Name</label>

              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  className="edit-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              ) : (
                <p>{user.name}</p>
              )}
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <Mail size={20} />
            </div>

            <div className="info-text">
              <label>Email Address</label>

              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  className="edit-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button type="submit" className="save-btn" disabled={loading}>
                  <Save size={18} />
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <Activity size={24} color="#3498db" />
          <h3>12</h3>
          <p>Scans Done</p>
        </div>

        <div className="stat-card">
          <Shield size={24} color="#2ecc71" />
          <h3>Safe</h3>
          <p>Health Score</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
