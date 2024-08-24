import React, { useState, useEffect } from "react";
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

  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // this is temperory, need to store login state in local session and cookie instead of firebase session manager
        // User is signed in
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setExportUserData(userData);
          setUserLoggedIn(true);
          setUserName(userData.fullName);
          setUserUid(user.uid);

          // NOT FINALIZED, shows a message about who's logged in. Might show every time the user opens something in a new tab
          setShowMessage({
            type: "success",
            message: "Logged in as " + userData.fullName,
          });
          setPopUpMessageTrigger("true");
        }
      } else {
        // User is signed out
        setUserLoggedIn(false);
        setUserName(null);
        setUserUid(null);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

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

  const handleLogout = () => {
    setUserLoggedIn(false);
    setUserName("");
    setUserUid("");
    handleLoginButtonClick();
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
      />

      {showSignUpForm && !userLoggedIn && (
        <SignUpForm
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
        />
      )}
      {showLoginForm && !userLoggedIn && (
        <LoginForm
          onLogin={handleLogin}
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
        />
      )}
      {showSettings && userLoggedIn && (
        <AccountSettings
          userData={exportUserData}
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
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
