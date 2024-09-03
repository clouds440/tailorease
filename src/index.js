import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./utils/UserContext";
import PopupMessage from "./components/PopupMessage";
import { DirectionProvider } from "./utils/LayoutDirectionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DirectionProvider>
      <UserProvider>
        <PopupMessage />
        <App />
      </UserProvider>
    </DirectionProvider>
  </React.StrictMode>
);
