import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import backgroundImage from "./graphics/images/background.jpg";
import AccountSettings from "./components/AccountSettings";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage";
import { DirectionContext } from "./utils/LayoutDirectionContext";
import BecomeTailor from "./components/BecomeTailor";

function App() {
  const { direction } = useContext(DirectionContext);
  const margins = direction === "ltr" ? "md:ml-36" : "md:mr-36";
  const fontFamily = direction === "ltr" ? "font-sans" : "font-urdu";

  return (
    <Router>
      <div
        className={`overflow-auto inset-0 h-screen w-screen bg-cover bg-center z-[-1] ${fontFamily}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Navbar with fixed position */}
        <div className="fixed top-0 left-0 w-full md:w-36 bg-opacity-20 backdrop-blur-sm">
          <Navbar />
        </div>

        {/* Main content with auto overflow */}
        <div
          className={`flex-grow mt-20 md:mt-0 px-3 ${margins} overflow-auto h-screen`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/become-tailor" element={<BecomeTailor />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
