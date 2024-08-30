import React, { createContext, useState, useMemo } from "react";

export const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [visibleComponents, setVisibleComponents] = useState([]);

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
    setVisibleComponents([]);
  };

  const contextValue = useMemo(() => {
    const isComponentVisible = (componentName) => {
      return visibleComponents.includes(componentName);
    };

    return {
      showComponent,
      hideComponent,
      hideAllComponents,
      isComponentVisible,
    };
  }, [visibleComponents]);

  return (
    <VisibilityContext.Provider value={contextValue}>
      {children}
    </VisibilityContext.Provider>
  );
};
