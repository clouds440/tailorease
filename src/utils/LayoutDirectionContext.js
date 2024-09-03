import React, { createContext, useState } from "react";

export const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState("ltr");

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      <div dir={direction}>{children}</div>
    </DirectionContext.Provider>
  );
};
