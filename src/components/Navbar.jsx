import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import { SettingsIcon, LogoutIcon, MenuIcon } from "../graphics/icons/svgIcons";
import { VisibilityContext } from "../utils/VisibilityContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ userLoggedIn, setUserLoggedIn, userData, theme }) => {
  const [userFullName, setUserFullName] = useState(userData.fullName);
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

  useEffect(() => {
    setUserFullName(userData.fullName);
  }, [userData]);

  const dropdownOptions = [
    {
      text: "Settings",
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
    <nav
      className={`fixed left-0 top-0 h-screen w-24 md:w-36 rounded-r-md ${theme.mainTheme} overflow-hidden`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <Logo
            fontSize={"text-2xl"}
            classes={`my-5 pb-5 border-b ${theme.colorBorder}`}
          />
          {userLoggedIn ? (
            <div className="mb-4 py-1 text-center select-none">
              <span>{userFullName}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <SimpleButton
                onClick={() => {
                  showComponent("LoginForm");
                  hideComponent("SignUpForm");
                }}
                btnText={"Log In"}
                type={"primary"}
                extraclasses="w-full mx-2"
              />
            </div>
          )}
          <div className="flex items-center justify-center mt-10">
            <ul className="flex flex-col space-y-4 select-none">
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <HomeIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">Home</span>
              </li>
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <AboutIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">About</span>
              </li>
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <ServicesIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">Services</span>
              </li>
              <li
                className={`flex items-center space-x-2 px-8 py-2 rounded-xl w-full ${theme.hoverBg}`}
              >
                {/* <ContactIcon size="5" className="text-blue-500" /> */}
                <span className="hidden md:inline-block">Contact</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`flex items-center space-x-2 px-8 py-2 rounded-md w-full ${theme.hoverBg}`}
        >
          {userLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <span
                className="cursor-pointer flex items-center select-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <MenuIcon size={"5"} color={"text-yellow-600"} />
                <span className="hidden md:inline-block">Menu</span>
              </span>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className={`absolute bottom-8 mt-2 w-48 rounded-md z-20`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.1 }}
                  >
                    {dropdownOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={option.onClick}
                        className={`flex w-full py-2 ${theme.hoverBg} rounded-md`}
                      >
                        {option.icon}
                        {option.text}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
