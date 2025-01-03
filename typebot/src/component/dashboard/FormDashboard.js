import React, { useState } from "react"; 
import folderIcon from "../asset/folder.png";
import plus from "../asset/plusicon.png";
import deleteicon from '../asset/delete.png';
import line from '../asset/Line 4.png';
import dropdown from '../asset/arrow_drop_down.png';
import "./dashboard.css";
import {useLocation} from "react-router-dom";
import Setting from './setting.js'; 


const FormDashboard = () => {
  const [theme, setTheme] = useState("light");
  const [folders, setFolders] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // New state for Settings
  const location = useLocation();
  const username = location.state?.username || "User"; // Retrieve username or fallback to 'User

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openCreatePopup = () => {
    setIsPopupVisible(true);
    setNewFolderName("");
  };

  const closeCreatePopup = () => {
    setIsPopupVisible(false);
  };

  const openDeletePopup = (index) => {
    setIsDeletePopupVisible(true);
    setFolderToDelete(index);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupVisible(false);
    setFolderToDelete(null);
  };

  const addFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { name: newFolderName }]);
      closeCreatePopup();
    }
  };

  const confirmDelete = () => {
    if (folderToDelete !== null) {
      setFolders(folders.filter((_, i) => i !== folderToDelete));
      closeDeletePopup();
    }
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
    setIsDropdownOpen(false); // Close dropdown
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      {!isSettingsOpen ? (
        <>
          <header className="navbar">
            <div className="navbar-content">
              <div className="workspace-container">
                <div className="workspace">
                  {username}'s Workspace
                  <button
                    className={`dropdown-icon ${isDropdownOpen ? "open" : ""}`}
                    onClick={toggleDropdown}
                  >
                    <img src={dropdown} alt="dropdown" />
                  </button>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-container">
                    <div className="dropdown-row">{username}'s Workspace</div>
                    <div className="dropdown-row" onClick={openSettings}>
                      Settings
                    </div>
                    <div className="dropdown-row">Log Out</div>
                  </div>
                )}
              </div>

              <div className="navbar-actions">
                <div className={`theme-container ${theme}`}>
                  <span className="theme-label">Light</span>
                  <button onClick={toggleTheme} className={`mode ${theme}`}>
                    <span className="mode-dot"></span>
                  </button>
                  <span className="theme-label">Dark</span>
                </div>
                <button className="share-button">Share</button>
              </div>
            </div>
          </header>
          <main>
            <div className="main-content">
              <div className="folder-row">
                <div className="folder create-folder" onClick={openCreatePopup}>
                  <h5>
                    <img src={folderIcon} alt="folder" className="foldericon" />{" "}
                    Create a folder
                  </h5>
                </div>
                {folders.map((folder, index) => (
                  <div key={index} className="folder">
                    <span className="folder-name">{folder.name}</span>
                    <button
                      className="delete-folder"
                      onClick={() => openDeletePopup(index)}
                    >
                      <img src={deleteicon} alt="delete" className="delete" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="typebot">
                <img src={plus} alt="plus" className="plus" />
                <p>Create a typebot</p>
              </div>
            </div>

            {isPopupVisible && (
              <div className="popup">
                <div className="popup-content">
                  <h3>Create New Folder</h3>
                  <input
                    type="text"
                    placeholder="Enter folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                  <div className="popup-actions">
                    <button className="popup-done" onClick={addFolder}>
                      Done
                    </button>
                    <div className="line"></div>
                    <button className="popup-cancel" onClick={closeCreatePopup}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isDeletePopupVisible && (
              <div className="popup">
                <div className="popup-content">
                  <h3>Are you sure you want to delete this folder?</h3>
                  <div className="popup-actions">
                    <button className="popup-done" onClick={confirmDelete}>
                      Confirm
                    </button>
                    <img src={line} alt="line" className="line" />
                    <button className="popup-cancel" onClick={closeDeletePopup}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      ) : (
        <Setting closeSettings={closeSettings} />
      )}
    </div>
  );
};

export default FormDashboard;
