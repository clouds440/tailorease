import React, { useContext, useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import SimpleButton from "./SimpleButton";
import { auth, signOut } from "../firebaseConfig";
import { UserContext } from "../utils/UserContext";
import { t } from "i18next";
import {
  SettingsIcon,
  LogoutIcon,
  MenuIcon,
  HomeIcon,
  CartIcon,
  ServicesIcon,
  ContactIcon,
  LoginIcon,
} from "../graphics/icons/svgIcons";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {
    userData,
    theme,
    userLoggedIn,
    setUserLoggedIn,
    setShowmessage,
    setPopUpMessageTrigger,
  } = useContext(UserContext);
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
      navigate("/");
    } catch (error) {
      setShowmessage({
        type: "danger",
        message: t("couldntLogout"),
      });
      setPopUpMessageTrigger("true");
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
      text: t("settings"),
      icon: <SettingsIcon size={"5"} color={`${theme.iconColor}`} />,
      onClick: () => {
        navigate("/settings");
        setDropdownOpen(false);
      },
    },
    {
      text: t("logout"),
      icon: <LogoutIcon size={"5"} color={`${theme.iconColor}`} />,
      onClick: handleLogout,
    },
    // Add more options here as needed
  ];

  const animate = window.innerWidth >= 768 ? 10 : -10;
  const linkStyles = `flex items-center justify-center md:justify-start cursor-pointer px-4 py-2 rounded-xl w-auto md:w-full duration-500 ${theme.hoverBg}`;

  return (
    <div className="flex">
      <nav
        className={`flex-shrink-0 fixed top-0 md:ltr:left-0 md:rtl:right-0 h-auto md:h-screen w-screen md:w-36 rounded-md ${theme.mainTheme}`}
      >
        <div className="justify-between h-full">
          <div>
            <div className={`flex md:block justify-between mt-1`}>
              <Logo
                fontSize={"text-2xl"}
                classes={`md:my-5 md:pb-5 mx-5 pr-4 md:mx-0 md:pr-0 md:border-b ${theme.colorBorder}`}
              />
              {userLoggedIn ? (
                <div className="md:mb-4 py-1 text-center mx-5 md:mx-0 select-none">
                  <span>{userFullName}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <SimpleButton
                    onClick={() => navigate("/login")}
                    btnText={t("login")}
                    type={"simple"}
                    extraclasses="w-full mx-2"
                    icon={<LoginIcon size={"5"} />}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between md:mt-10">
              <ul className="md:space-y-4 justify-evenly select-none w-full md:inline grid grid-flow-col">
                <li className={linkStyles}>
                  <HomeIcon size={"5"} color={`${theme.iconColor}`} />
                  <span
                    className={"hidden md:inline-block md:ltr:ml-2 md:rtl:mr-2"}
                  >
                    {t("home")}
                  </span>
                </li>
                <li className={linkStyles}>
                  <CartIcon size={"5"} color={`${theme.iconColor}`} />
                  <span
                    className={"hidden md:inline-block md:ltr:ml-2 md:rtl:mr-2"}
                  >
                    {t("market")}
                  </span>
                </li>
                <li className={linkStyles}>
                  <ServicesIcon size={"5"} color={`${theme.iconColor}`} />
                  <span
                    className={"hidden md:inline-block md:ltr:ml-2 md:rtl:mr-2"}
                  >
                    {t("services")}
                  </span>
                </li>
                <li className={linkStyles}>
                  <ContactIcon size={"5"} color={`${theme.iconColor}`} />
                  <span
                    className={"hidden md:inline-block md:ltr:ml-2 md:rtl:mr-2"}
                  >
                    {t("contactUs")}
                  </span>
                </li>
                <div>
                  <div className="relative md:absolute md:bottom-1 w-full">
                    {userLoggedIn && (
                      <div
                        className={linkStyles}
                        ref={dropdownRef}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <div className="flex">
                          <span className="flex items-center select-none">
                            <MenuIcon size={"5"} color={"text-yellow-600"} />
                            <span
                              className={
                                "hidden md:inline-block ltr:ml-2 rtl:mr-2"
                              }
                            >
                              {t("menu")}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            className={`absolute w-auto md:w-36 z-50 ${
              window.innerWidth >= 768
                ? "md:pt-4 md:bottom-14"
                : "rtl:left-1 ltr:right-1 top-20 px-2 py-2 rounded-md " +
                  theme.mainTheme
            }`}
            initial={{ opacity: 0, y: animate }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: animate }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className={`md:space-y-4 justify-center select-none w-full`}
              initial={{ opacity: 0, y: animate }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: animate }}
              transition={{ duration: 0.3 }}
            >
              {dropdownOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={option.onClick}
                  className={`justify-between ${linkStyles} ${theme.colorText}`}
                >
                  {option.icon}
                  <span className={"ltr:ml-2 rtl:mr-2"}>{option.text}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
