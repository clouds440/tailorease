import React, { createContext, useContext, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Message from "./components/PopupMessage";
import backgroundImage from "./graphics/images/background.jpg";
import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  signOut,
} from "./firebaseConfig";
import AccountSettings from "./components/AccountSettings";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [exportUserData, setExportUserData] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [popUpMessageTrigger, setPopUpMessageTrigger] = useState(false);
  const [showMessage, setShowMessage] = useState({
    type: "",
    message: "",
  });

  const [theme, setTheme] = useState({
    mainTheme: "theme-default",
    colorText: "text-gray-100",
    colorBorder: "border-white",
    iconColor: "text-blue-500",
    hoverText: "hover:text-blue-500",
    hoverBg: "hover:bg-gray-700",
  });

  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const storedUserData =
      sessionStorage.getItem("userData") || localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setExportUserData(userData);
      setUserLoggedIn(true);
      setUserName(userData.fullName);
      setUserUid(userData.uid);
    } else {
      setUserLoggedIn(false);
      setUserName(null);
      setUserUid(null);
    }
  });

  const handleSignUpButtonClick = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
  };

  const handleDismissMessage = () => {
    setPopUpMessageTrigger(false);
  };

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleLogin = (name, uid) => {
    setUserLoggedIn(true);
    setUserName(name);
    setUserUid(uid);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase

      // Clear local storage and session storage
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");

      // Reset local state
      setUserLoggedIn(false);
      setUserName("");
      setUserUid("");

      // Perform any additional logout actions
      handleLoginButtonClick();
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Navbar
        userLoggedIn={userLoggedIn}
        userName={userName}
        onSignUpClick={handleSignUpButtonClick}
        onLoginClick={handleLoginButtonClick}
        onLogout={handleLogout}
        onSettingsClick={handleSettingsClick}
        theme={theme}
      />

      {showSignUpForm && !userLoggedIn && (
        <SignUpForm
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
          theme={theme}
        />
      )}
      {showLoginForm && !userLoggedIn && (
        <LoginForm
          onLogin={handleLogin}
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
          theme={theme}
        />
      )}
      {showSettings && userLoggedIn && (
        <AccountSettings
          userData={exportUserData}
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
          setTheme={setTheme}
          theme={theme}
        />
      )}
      {
        <Message
          message={showMessage.message}
          type={showMessage.type}
          trigger={popUpMessageTrigger}
          onDismiss={handleDismissMessage}
        />
      }
    </div>
  );
}

export default App;
