import { useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Link, Navigate } from "react-router-dom";
import { t } from "i18next";
import SimpleButton from "./SimpleButton";

const TailorApplicationForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessPhone: "",
    businessAddress: "",
    description: "",
  });

  const { theme, userLoggedIn, setShowMessage, setPopUpMessageTrigger } =
    useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!formData.businessName.trim()) {
      setShowMessage({
        type: "info",
        message: t("enterFullBusinessName"),
      });
      setPopUpMessageTrigger("true");
      return;
    } else if (formData.businessName.length < 3) {
      setShowMessage({
        type: "info",
        message: t("nameMinLength"),
      });
      setPopUpMessageTrigger("true");
      return;
    }

    if (!formData.businessPhone.trim()) {
      setShowMessage({
        type: "warning",
        message: t("businessPhoneRequired"),
      });
      setPopUpMessageTrigger(true);
      return;
    }

    if (!/^\d*$/.test(formData.businessPhone)) {
      setShowMessage({
        type: "warning",
        message: t("phoneNumberDigitsOnly"),
      });
      setPopUpMessageTrigger("true");
      return;
    }
    if (!formData.businessAddress.trim()) {
      setShowMessage({
        type: "warning",
        message: t("businessAddressRequired"),
      });
      setPopUpMessageTrigger(true);
      return;
    }
    onNext(formData); // Pass form data to the next component
  };

  const inputStyles = `w-full p-1 mt-4 peer ${theme.colorText} border-b-2 z-10 ${theme.colorBorder} outline-none focus:border-blue-500 transition-all duration-300 bg-transparent`;
  const placeHolderStyles = `absolute top-5 pointer-events-none ltr:left-1 rtl:right-1 ${theme.colorText} duration-300 transform -translate-y-7 scale-75 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:${theme.colorText} peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-blue-500`;

  if (!userLoggedIn) {
    return <Navigate to={"/signup"} />;
  }

  return (
    <div className="flex items-center justify-center mt-4 max-w-2xl w-auto mx-auto p-6 rounded-md select-none">
      <div
        className={`p-6 rounded-lg ${theme.mainTheme} w-full max-w-md relative`}
      >
        <h2 className={`flex text-xl text-${theme.themeColor} font-bold mb-4`}>
          {t("becomeTailor")}
        </h2>
        <form onSubmit={handleNext} noValidate>
          <div className="relative mb-4">
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="businessName">
              {t("businessName")}
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="tel"
              id="businessPhone"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="businessPhone">
              {t("businessPhone")}
            </label>
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              id="businessAddress"
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              className={`${inputStyles}`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="businessAddress">
              {t("businessAddress")}
            </label>
          </div>
          <div className="relative mb-4">
            <textarea
              maxLength={250}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputStyles} min-h-9 max-h-[130px]`}
              placeholder=" "
            />
            <label className={`${placeHolderStyles}`} htmlFor="description">
              {t("description")}{" "}
              <span className="text-xs">{t("optional")}</span>
            </label>
          </div>
          <SimpleButton
            btnText={t("next")}
            type={"primary-submit"}
            extraclasses={"w-full"}
          />
          <div className="items-center justify-center flex flex-row mt-4">
            <Link to={"/terms/tailors"}>
              <span className={`${theme.iconColor} ${theme.hoverText}`}>
                {t("termsTailors")}
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TailorApplicationForm;
