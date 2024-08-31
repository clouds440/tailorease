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
    hoverBg: "hover:bg-indigo-400 hover:bg-opacity-30",
  });

  useEffect(() => {
    const storedUserData =
      sessionStorage.getItem("userData") || localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUserLoggedIn(true);
    setUserData(loggedInUser);
  };

  const handleSignUp = (signedUpUser) => {
    setUserLoggedIn(true);
    setUserData(signedUpUser);
  };

  const handleDismissMessage = () => {
    setPopUpMessageTrigger(false);
  };

  return (
    <VisibilityProvider>
      <div
        className="fixed inset-0 h-screen w-screen bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex h-screen overflow-hidden bg-gray-600 bg-opacity-20 backdrop-blur-sm">
          <Navbar
            userLoggedIn={userLoggedIn}
            setUserLoggedIn={setUserLoggedIn}
            userData={userData}
            theme={theme}
          />
          <div className="flex-grow ml-24 md:ml-36 overflow-auto">
            <SignUpForm
              onSignUp={handleSignUp}
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
            {userLoggedIn && (
              <AccountSettings
                userData={userData}
                setUserData={setUserData}
                setShowMessage={setShowMessage}
                setTrigger={setPopUpMessageTrigger}
                setTheme={setTheme}
                theme={theme}
              />
            )}
            <Message
              message={showMessage.message}
              type={showMessage.type}
              trigger={popUpMessageTrigger}
              onDismiss={handleDismissMessage}
            />
          </div>
        </div>
      </div>
    </VisibilityProvider>
  );
}

export default App;
