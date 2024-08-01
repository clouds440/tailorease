import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Message from "./components/PopupMessage";
import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
} from "./firebaseConfig";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
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
        // User is signed in
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserLoggedIn(true);
          setUserName(userData.fullName);
          setUserUid(user.uid);
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
    <div>
      <Navbar
        userLoggedIn={userLoggedIn}
        userName={userName}
        onSignUpClick={handleSignUpButtonClick}
        onLoginClick={handleLoginButtonClick}
        onLogout={handleLogout}
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
