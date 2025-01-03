import React, { useState } from "react";
import eye from '../asset/eye.png';
import profile from '../asset/profile.png';
import lock from '../asset/lock _icon.png';
import logout from '../asset/Logout.png';
import "./setting.css";

const Setting = ({ closeSettings }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated data:", formData);
    alert("Updated successfully!");
  };

  return (
    <div className="container">
    <div className="settings-container">
      <h2>Settings</h2>
      <button onClick={closeSettings}>Back</button>
      <form onSubmit={handleSubmit} className="settings-form">
        {/* Name Field */}
        <div className="input-group">
          <span className="icon"><img src={profile} alt="profile"/> </span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Email Field */}
        <div className="input-group">
          <span className="icon"><img src={lock} alt="lock"/> </span>
          <input
            type="email"
            name="email"
            placeholder="Update Email"
            value={formData.email}
            onChange={handleInputChange}
          />
           <button
            type="button"
            className="toggle-visibility"
            onClick={() => togglePasswordVisibility(" ")}
          >
             <img src={eye} alt="eye"/>
          </button>
        </div>

        {/* Old Password Field */}
        <div className="input-group">
          <span className="icon"><img src={lock} alt="lock"/> </span>
          <input
            type={showPasswords.oldPassword ? "text" : "password"}
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => togglePasswordVisibility("oldPassword")}
          >
             <img src={eye} alt="eye"/>
          </button>
        </div>

        {/* New Password Field */}
        <div className="input-group">
          <span className="icon"> <img src={lock} alt="lock"/></span>
          <input
            type={showPasswords.newPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => togglePasswordVisibility("newPassword")}
          >
             <img src={eye} alt="eye"/>
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="update-button">
          Update
        </button>
      </form>

      {/* Logout Link */}
      <div className="logout-container">
        <a href="/logout" className="logout-link">
           <img src={logout} alt="logout"/>Log out
        </a>
      </div>
      
    </div>
    </div>
  );
};

export default Setting;
