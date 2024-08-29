import React, { createContext, useState } from "react";

export const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const initialVisibleComponents = ["Navbar"]; // Initial visible components

  const [visibleComponents, setVisibleComponents] = useState(
    initialVisibleComponents
  );

  const showComponent = (componentName) => {
    setVisibleComponents((prev) => {
      if (!prev.includes(componentName)) {
        return [...prev, componentName];
      }
      return prev;
    });
  };

  const hideComponent = (componentName) => {
    setVisibleComponents((prev) =>
      prev.filter((name) => name !== componentName)
    );
  };

  const hideAllComponents = () => {
    setVisibleComponents(initialVisibleComponents); // Reset to initial visible components
  };

  const isComponentVisible = (componentName) => {
    return visibleComponents.includes(componentName);
  };

  return (
    <VisibilityContext.Provider
      value={{
        showComponent,
        hideComponent,
        hideAllComponents,
        isComponentVisible,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};
