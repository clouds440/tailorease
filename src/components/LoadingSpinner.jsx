import { SyncLoader } from "react-spinners";

function LoadingSpinner({ size, extraClasses }) {
  return (
    <div className={`flex justify-center items-center ${extraClasses}`}>
      <SyncLoader color="#2874A6" size={size} speedMultiplier={0.7} />
    </div>
  );
}

export default LoadingSpinner;
