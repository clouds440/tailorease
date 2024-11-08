import React from "react";
import SimpleButton from "./SimpleButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Link to={"/become-tailor"}>
        <SimpleButton
          btnText={"Become a Tailor"}
          type={"primary"}
          extraclasses={"py-5 text-3xl select-none"}
        />
      </Link>
    </div>
  );
};

export default Home;
