import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import { SettingsIcon, LogoutIcon, MenuIcon } from "../graphics/icons/svgIcons";
import { VisibilityContext } from "../utils/VisibilityContext";

const Navbar = ({ userLoggedIn, setUserLoggedIn, userName, theme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { showComponent, hideComponent, hideAllComponents } =
    useContext(VisibilityContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      setUserLoggedIn(false);
      hideAllComponents();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const dropdownOptions = [
    {
      text: "Account Settings",
      icon: (
        <SettingsIcon
          size={"6"}
          color={`${theme.iconColor}`}
          extraClasses={"ml-3"}
        />
      ),
      onClick: () => {
        showComponent("AccountSettings");
        setDropdownOpen(false);
      },
    },
    {
      text: "Logout",
      icon: (
        <LogoutIcon
          size={"6"}
          color={`${theme.iconColor}`}
          extraClasses={"ml-3"}
        />
      ),
      onClick: handleLogout,
    },
    // Add more options here as needed
  ];

  return (
    <nav className={`p-4 rounded-md ${theme.mainTheme}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <ul className="flex space-x-4 mx-auto select-none">
          <li>
            <a href="#home" className="hover:text-shadow-lg">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-shadow-lg">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-shadow-lg">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-shadow-lg">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex space-x-4">
          {userLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <span
                className="cursor-pointer flex items-center hover:text-shadow-lg select-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Hello, {userName}
                <MenuIcon
                  size={"6"}
                  color={"text-yellow-600"}
                  extraClasses={"ml-2"}
                />
              </span>
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-6 w-48 rounded-md ${theme.mainTheme} z-20`}
                >
                  {dropdownOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.onClick}
                      className={`flex justify-between items-center w-full text-left px-4 py-2 ${theme.hoverBg} rounded-md`}
                    >
                      {option.text}
                      {option.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <SimpleButton
                onClick={() => {
                  showComponent("SignUpForm");
                  hideComponent("LoginForm");
                }}
                btnText={"Sign Up"}
                type={"primary"}
              />
              <SimpleButton
                onClick={() => {
                  showComponent("LoginForm");
                  hideComponent("SignUpForm");
                }}
                btnText={"Login"}
                type={"primary"}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
