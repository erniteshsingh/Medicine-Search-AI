import React from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, LogOut, Shield, Activity } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const { user, logoutUser } = useAuth();

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
          <h2 className="profile-name">{user.name || "User Name"}</h2>
          <p className="profile-status">MedInsight Premium Member</p>
        </div>

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

          <div className="info-item">
            <div className="info-icon">
              <Shield size={20} />
            </div>
            <div className="info-text">
              <label>Account Security</label>
              <p>Verified Account</p>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn" onClick={logoutUser}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
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
