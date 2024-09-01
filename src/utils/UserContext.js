import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  // Initialize the theme
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? JSON.parse(savedTheme)
      : {
          mainTheme: "theme-default",
          colorText: "text-gray-100",
          colorBorder: "border-white",
          iconColor: "text-blue-500",
          hoverText: "hover:text-blue-500",
          hoverBg: "hover:bg-indigo-400 hover:bg-opacity-30",
        };
  });

  // Initialize user data
  const [userData, setUserData] = useState(() => {
    const savedUser =
      sessionStorage.getItem("userData") || localStorage.getItem("userData");
    return savedUser
      ? JSON.parse(savedUser)
      : { uid: "", fullName: "", email: "", password: "" };
  });

  // Determine if the user is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(!!userData.uid);

  useEffect(() => {
    // Whenever userData or theme changes, update localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("theme", JSON.stringify(theme));
    setUserLoggedIn(!!userData.uid);
  }, [userData, theme]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        theme,
        setTheme,
        userLoggedIn,
        setUserLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
