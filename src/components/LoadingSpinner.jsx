import { SyncLoader } from "react-spinners";

function LoadingSpinner({ size, extraClasses }) {
  return (
    <div className={`flex justify-center items-center ${extraClasses}`}>
      <SyncLoader color="#0ea5e9" size={size} speedMultiplier={0.7} />
    </div>
  );
}

export default LoadingSpinner;
