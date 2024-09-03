import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import { UserContext } from "../utils/UserContext";
import { DirectionContext } from "../utils/LayoutDirectionContext";
import {
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
  HomeIcon,
  CartIcon,
  ServicesIcon,
  ContactIcon,
  SendIcon,
  LoginIcon,
} from "../graphics/icons/svgIcons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { direction, margins } = useContext(DirectionContext);
  const { userData, theme, userLoggedIn, setUserLoggedIn } =
    useContext(UserContext);
  const [userFullName, setUserFullName] = useState(userData.fullName);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");
      setUserLoggedIn(false);
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
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    setUserFullName(userData.fullName);
  }, [userData]);

  const dropdownOptions = [
    {
      text: "Option 3",
      icon: <SendIcon size={"5"} color={`${theme.iconColor}`} />,
      onClick: () => {
        navigate("/settings");
        setDropdownOpen(false);
      },
    },
    {
      text: "Settings",
      icon: <SettingsIcon size={"5"} color={`${theme.iconColor}`} />,
      onClick: () => {
        navigate("/settings");
        setDropdownOpen(false);
      },
    },
    {
      text: "Logout",
      icon: <LogoutIcon size={"5"} color={`${theme.iconColor}`} />,
      onClick: handleLogout,
    },
    // Add more options here as needed
  ];

  const position = direction === "ltr" ? "left-0" : "right-0";

  const linkStyles = `flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-full duration-500 ${theme.hoverBg}`;

  return (
    <nav
      className={`flex-shrink-0 fixed top-0 h-screen w-16 sm:w-20 md:w-36 rounded-md overflow-hidden ${theme.mainTheme} ${position}`}
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
                onClick={() => navigate("/login")}
                btnText={"Log In"}
                type={"simple"}
                extraclasses="w-full mx-2"
                icon={<LoginIcon size={"6"} />}
              />
            </div>
          )}
          <div className="flex items-center justify-center mt-10">
            <ul className="flex flex-col space-y-4 select-none w-full">
              <li className={linkStyles}>
                <HomeIcon size={"5"} color={`${theme.iconColor}`} />
                <span className={`hidden md:inline-block ${margins}2`}>
                  Home
                </span>
              </li>
              <li className={linkStyles}>
                <CartIcon size={"5"} color={`${theme.iconColor}`} />
                <span className={`hidden md:inline-block ${margins}2`}>
                  Market
                </span>
              </li>
              <li className={linkStyles}>
                <ServicesIcon size={"5"} color={`${theme.iconColor}`} />
                <span className={`hidden md:inline-block ${margins}2`}>
                  Services
                </span>
              </li>
              <li className={linkStyles}>
                <ContactIcon size={"5"} color={`${theme.iconColor}`} />
                <span className={`hidden md:inline-block ${margins}2`}>
                  Contact
                </span>
              </li>
            </ul>
          </div>
        </div>
        <AnimatePresence>
          {dropdownOpen && (
            <div className="flex items-baseline justify-center">
              <motion.ul
                className={`flex flex-col space-y-4 select-none w-full`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                {dropdownOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={option.onClick}
                    className={linkStyles}
                  >
                    {option.icon}
                    <span className={`hidden md:inline-block ${margins}2`}>
                      {option.text}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </div>
          )}
        </AnimatePresence>
        {userLoggedIn && (
          <div
            className={linkStyles}
            ref={dropdownRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center">
              <span className="flex items-center select-none">
                <MenuIcon size={"5"} color={"text-yellow-600"} />
                <span className={`hidden md:inline-block ${margins}2`}>
                  Menu
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
