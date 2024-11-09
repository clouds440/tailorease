import { useContext, useState, useEffect } from "react";
import TailorApplicationForm from "./TailorApplicationForm";
import TailorSpecialitiesForm from "./TailorSpecialitiesForm";
import ProgressBar from "./ProgressBar";
import { UserContext } from "../utils/UserContext";
import { t } from "i18next";
import { MoonLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import {
  db,
  auth,
  storage,
  uploadBytes,
  collection,
  query,
  getDoc,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  sendEmailVerification,
} from "../firebaseConfig";
import SimpleButton from "./SimpleButton";

const BecomeTailor = () => {
  const [step, setStep] = useState(1);
  const { userData, setPopUpMessageTrigger, setShowMessage } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const [hasBusinessAccount, setHasBusinessAccount] = useState(null);

  useEffect(() => {
    const checkBusinessAccount = async () => {
      if (!userData?.uid) return; // Exit if userData or uid is not available

      try {
        const userQuery = query(
          collection(db, "users"),
          where("uid", "==", userData.uid)
        );
        const querySnapshot = await getDocs(userQuery);

        const docId = querySnapshot.docs[0].id;
        const userDocRef = doc(db, "users", docId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().bId) {
          setHasBusinessAccount(true); // User has a business account
        } else {
          setHasBusinessAccount(false); // No business account found
        }
      } catch (error) {
        console.error("Error checking business account:", error);
      }
    };

    checkBusinessAccount();
  }, [userData]);

  const stepNames = ["Business Info", "Additional Info", "Submitting"];

  // Handle next step: collect form data and move to step 2
  const handleNext = (data) => {
    setFormData({ ...formData, ...data }); // Combine form data
    setTimeout(() => {
      setStep(step + 1); // Move to the next step
    }, 300); // Delay to allow animation time
  };

  // Handle back to step 1
  const handleBack = () => {
    setStep(1); // Go back to step 1
  };

  // Final submit: combine data and handle form submission
  const handleSubmit = async (finalData) => {
    const combinedData = { ...formData, ...finalData };
    console.log("Combined form data (before removing picture):", combinedData);

    // Extract `businessPicture` from `combinedData` to avoid storing it directly in Firestore
    const { businessPicture, ...dataWithoutPicture } = combinedData;

    setIsLoading(true);
    try {
      // 1. Upload the image to Firebase Storage
      // const storageRef = storage.ref(`businessPictures/${userData.uid}`);
      // await uploadBytes(storageRef, businessPicture);
      // const imageUrl = await storageRef.getDownloadURL();

      // 2. Add business details to the "tailors" collection in Firestore
      const tailorsRef = collection(db, "tailors");
      const tailorDocRef = await addDoc(tailorsRef, {
        ...dataWithoutPicture,
        businessPictureUrl: "imageUrl",
        approved: false,
        ownerId: userData.uid,
      });

      // Get the newly created document ID
      const bId = tailorDocRef.id;

      // 3. Update the user document with the new business ID (bId)
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", userData.uid)
      );
      const querySnapshot = await getDocs(userQuery);

      const docId = querySnapshot.docs[0].id;
      const userDocRef = doc(db, "users", docId);
      await updateDoc(userDocRef, {
        bId: bId,
      });

      // 4. Send a verification email to the user
      await sendEmailVerification(auth.currentUser);

      setShowMessage({
        type: "success",
        message: t("verifyEmail"),
      });
      setPopUpMessageTrigger(true);
      navigate("/");
    } catch (error) {
      console.error("Error submitting business application:", error);
      setShowMessage({
        type: "error",
        message: t("errorSubmittingApplication"),
      });
      setPopUpMessageTrigger(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasBusinessAccount === null) {
    return (
      <div className="flex justify-center items-center h-full bg-gray-700 backdrop-blur-md bg-opacity-30">
        <MoonLoader size={60} color="#ffffff" />
      </div>
    ); // Loading indicator while checking
  }

  return hasBusinessAccount ? (
    <div className="flex flex-col justify-center items-center h-full bg-gray-700 backdrop-blur-md bg-opacity-30">
      <span className="text-2xl text-white mb-4">
        You already have a business account!
      </span>
      <Link to={"/"}>
        <SimpleButton
          btnText={"Go home"}
          type={"primary"}
          extraclasses={"py-3 px-8 text-xl"}
        />
      </Link>
    </div>
  ) : (
    <div className="h-full relative overflow-y-auto overflow-x-hidden">
      <ProgressBar steps={3} currentStep={step} stepNames={stepNames} />
      {/* Step Forms */}
      <div
        className={`w-full h-full absolute transition-transform duration-500 ease-in-out ${
          step === 1 ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <TailorApplicationForm onNext={handleNext} />
      </div>
      <div
        className={`w-full h-full absolute transition-transform duration-500 ease-in-out ${
          step >= 2 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <TailorSpecialitiesForm
          formData={formData}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default BecomeTailor;
