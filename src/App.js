import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import backgroundImage from "./graphics/images/backgroundDefaultBlue.jpg";
import AccountSettings from "./components/AccountSettings";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage";
import { DirectionContext } from "./utils/LayoutDirectionContext";
import BecomeTailor from "./components/BecomeTailor";

function App() {
  const { direction } = useContext(DirectionContext);
  const fontFamily = direction === "ltr" ? "font-sans" : "font-urdu";

  return (
    <Router>
      <div
        className={`relative flex h-screen w-screen ${fontFamily}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Navbar with fixed position */}
        <div className="fixed md:relative w-full md:w-36 z-40">
          <Navbar />
        </div>

        {/* Main content with scrollable overflow */}
        <div className={`overflow-y-auto flex-1 mt-[85px] md:mt-0 px-[3px]`}>
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
