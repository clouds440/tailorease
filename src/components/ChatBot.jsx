"use client";
import React, { useState } from "react";

const Chatbot = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Chatbot iframe */}
      <iframe
        id="chatbotIframe"
        src="https://chatbot.botanion.cc/chatbot/6GhSM0hIEsRLzwVdCXEJ?uid=8usNUScQ71fYadqnneQ3iITxKmM2&apiToken=YOUR_API_TOKEN&chatbotId=6GhSM0hIEsRLzwVdCXEJ"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        style={{
          display: isVisible ? "block" : "none",
          position: "fixed",
          bottom: "0",
          right: "20px",
          border: "none",
          zIndex: "1000",
          width: "900px",
          height: "700px",
        }}
        title="Chatbot"
      />
      {/* Toggle button */}
      <button
        id="toggleButton"
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1001",
          width: "50px",
          height: "50px",
          backgroundColor: "purple",
          color: "white",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <i className="fas fa-comments"></i>
      </button>
    </div>
  );
};

export default Chatbot;
