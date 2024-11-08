import { useState } from "react";
import TailorApplicationForm from "./TailorApplicationForm";
import TailorSpecialitiesForm from "./TailorSpecialitiesForm";
import ProgressBar from "./ProgressBar";

const BecomeTailor = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({});
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
  const handleSubmit = (finalData) => {
    const combinedData = { ...formData, ...finalData };
    console.log("Combined form data:", combinedData); // Handle this data (e.g., save to Firebase)
    // Handle final submission logic (e.g., Firebase)
  };

  return (
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
