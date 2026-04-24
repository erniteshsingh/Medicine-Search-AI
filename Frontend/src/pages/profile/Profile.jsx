import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LogOut,
  Activity,
  Shield,
  Save,
  X,
  Lock,
} from "lucide-react";
import axios from "axios";
import "./Profile.css";
import API_URL from "../../apiConfig";

const Profile = () => {
  const { user, logoutUser, setUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
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
    } catch (error) {}
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (loading) return;

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
        setUser(response.data.user);

        setFormData({
          name: response.data.user.name || "",
          email: response.data.user.email || "",
        });

        setIsEditing(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.patch(
        `${API_URL}/api/v1/profile/change-password`,
        passwordData,
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
        });

        setIsChangingPassword(false);
      }
    } catch (error) {
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

  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });

    setIsChangingPassword(false);
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
      <button type="button" className="back-home-btn" onClick={handleGoHome}>
        Back to Home
      </button>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-status">MedInsight Member</p>
        </div>

        {!isEditing && !isChangingPassword ? (
          <>
            <div className="profile-body">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>

                <div className="info-text">
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>

                <div className="info-text">
                  <label>Email Address</label>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>

              <button
                type="button"
                className="password-btn"
                onClick={() => setIsChangingPassword(true)}
              >
                <Lock size={18} />
                Change Password
              </button>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </>
        ) : isEditing ? (
          <form onSubmit={handleUpdate} className="profile-body">
            <div className="info-item">
              <div className="info-icon">
                <User size={20} />
              </div>

              <div className="info-text">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="edit-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Mail size={20} />
              </div>

              <div className="info-text">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="edit-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="profile-actions">
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
            </div>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="profile-body">
            <div className="info-item">
              <div className="info-icon">
                <Lock size={20} />
              </div>

              <div className="info-text">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  className="edit-input"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <Lock size={20} />
              </div>

              <div className="info-text">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="edit-input"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="save-btn" disabled={loading}>
                <Save size={18} />
                {loading ? "Updating..." : "Update Password"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handlePasswordCancel}
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </form>
        )}
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
