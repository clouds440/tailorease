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

function App() {
  const { direction } = useContext(DirectionContext);
  const margins =
    direction === "ltr" ? "ml-16 sm:ml-20 md:ml-36" : "mr-16 sm:mr-20 md:mr-36";

  return (
    <Router>
      <div
        className="fixed inset-0 h-screen w-screen bg-cover bg-center z-[-1]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex h-screen overflow-hidden bg-gray-600 bg-opacity-20 backdrop-blur-sm">
          <Navbar />
          <div className={`flex-grow ${margins} overflow-auto`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/settings" element={<AccountSettings />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
