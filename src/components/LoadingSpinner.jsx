import { SyncLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center mt-4">
      <SyncLoader color="#2874A6" size={36} speedMultiplier={0.7} />
    </div>
  );
}

export default LoadingSpinner;
