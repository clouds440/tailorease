import React from "react";
import SimpleButton from "./SimpleButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-2xl text-white font-bold">
        Your Home is under construction. Sit tight!
      </h1>
      <SimpleButton
        btnText={"Become a Tailor"}
        type={"primary"}
        onClick={navigate("/become-tailor")}
      />
    </div>
  );
};

export default Home;
