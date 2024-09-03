import React, { createContext, useState } from "react";

export const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState(() => {
    const savedLanguage = JSON.parse(localStorage.getItem("lang")) || "en";
    return savedLanguage === "en" ? "ltr" : "rtl";
  });

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      <div dir={direction}>{children}</div>
    </DirectionContext.Provider>
  );
};
