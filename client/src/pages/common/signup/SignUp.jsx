import React from "react";
import SignupSelector from "./components/SignupSelector";
import bgImage from '../../../assets/images/truck_image.png'

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="absolute top-0 left-0 w-full h-[65vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 flex justify-center items-start my-[20vh]">
        <div className="bg-white shadow rounded-lg w-full max-w-[883px] h-[835px] px-4 md:px-0 flex items-center justify-center">
          <SignupSelector />
        </div>
      </div>
    </div>
  );
}
