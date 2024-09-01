import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Message from "./components/PopupMessage";
import backgroundImage from "./graphics/images/background.jpg";
import AccountSettings from "./components/AccountSettings";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [popUpMessageTrigger, setPopUpMessageTrigger] = useState(false);
  const [showMessage, setShowMessage] = useState({
    type: "",
    message: "",
  });

  const handleDismissMessage = () => {
    setPopUpMessageTrigger(false);
  };

  return (
    <Router>
      <div
        className="fixed inset-0 h-screen w-screen bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex h-screen overflow-hidden bg-gray-600 bg-opacity-20 backdrop-blur-sm">
          <Navbar />
          <div className="flex-grow ml-24 md:ml-36 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/signup"
                element={
                  <SignUpForm
                    setShowMessage={setShowMessage}
                    setTrigger={setPopUpMessageTrigger}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <LoginForm
                    setShowMessage={setShowMessage}
                    setTrigger={setPopUpMessageTrigger}
                  />
                }
              />
              <Route
                path="/settings"
                element={
                  <AccountSettings
                    setShowMessage={setShowMessage}
                    setTrigger={setPopUpMessageTrigger}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        <Message
          message={showMessage.message}
          type={showMessage.type}
          trigger={popUpMessageTrigger}
          onDismiss={handleDismissMessage}
        />
      </div>
    </Router>
  );
}

export default App;
