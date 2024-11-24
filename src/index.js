import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./utils/UserContext";
import PopupMessage from "./components/PopupMessage";
import { DirectionProvider } from "./utils/LayoutDirectionContext";
import "./utils/LanguageSwitcher";
import ChatBot from "./components/ChatBot";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <DirectionProvider>
        <ChatBot />
        <PopupMessage />
        <App />
      </DirectionProvider>
    </UserProvider>
  </React.StrictMode>
);
