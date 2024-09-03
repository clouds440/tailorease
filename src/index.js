import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./utils/UserContext";
import PopupMessage from "./components/PopupMessage";
import { DirectionProvider } from "./utils/LayoutDirectionContext";
import "./utils/LanguageSwitcher";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <DirectionProvider>
        <PopupMessage />
        <App />
      </DirectionProvider>
    </UserProvider>
  </React.StrictMode>
);
