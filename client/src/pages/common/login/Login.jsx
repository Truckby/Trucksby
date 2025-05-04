import React from "react";
import LoginSelector from "./components/LoginSelector";
import bgImage from '../../../assets/images/truck_image.png'
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Login() {
  return (
    <div>
      <div className="min-h-screen flex flex-col relative px-4">
      <div
        className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 flex justify-center items-start my-[20vh]">
        <div className="bg-white shadow rounded-lg w-full max-w-[883px] h-[619px] px-4 md:px-0 flex items-center justify-center">
          <LoginSelector />
        </div>
      </div>

    </div>
    </div>
  );
}
