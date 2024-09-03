import React, { createContext, useState } from "react";

export const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState("ltr");

  const margins = direction === "ltr" ? "ml-" : "mr-";
  const oppositeMargins = direction === "ltr" ? "mr-" : "ml-";

  return (
    <DirectionContext.Provider
      value={{ direction, setDirection, margins, oppositeMargins }}
    >
      <div dir={direction}>{children}</div>
    </DirectionContext.Provider>
  );
};
