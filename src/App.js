import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Message from "./components/PopupMessage";
import backgroundImage from "./graphics/images/background.jpg";
import AccountSettings from "./components/AccountSettings";
import { VisibilityProvider } from "./utils/VisibilityContext";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
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

  useEffect(() => {
    const storedUserData =
      sessionStorage.getItem("userData") || localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
      setUserLoggedIn(true);
      setUserName(userData.fullName);
    } else {
      setUserLoggedIn(false);
      setUserName(null);
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUserLoggedIn(true);
    setUserName(loggedInUser.fullName);
    setUserData(loggedInUser);
    console.log(userData);
  };

  const handleDismissMessage = () => {
    setPopUpMessageTrigger(false);
  };

  return (
    <VisibilityProvider>
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Navbar
          userLoggedIn={userLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
          userName={userName}
          theme={theme}
        />
        <SignUpForm
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
          theme={theme}
        />
        <LoginForm
          onLogin={handleLogin}
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
          theme={theme}
        />
        <AccountSettings
          userData={userData}
          setShowMessage={setShowMessage}
          setTrigger={setPopUpMessageTrigger}
          setTheme={setTheme}
          theme={theme}
        />
        <Message
          message={showMessage.message}
          type={showMessage.type}
          trigger={popUpMessageTrigger}
          onDismiss={handleDismissMessage}
        />
      </div>
    </VisibilityProvider>
  );
}

export default App;
