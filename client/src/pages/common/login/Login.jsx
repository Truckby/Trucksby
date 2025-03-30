import React from "react";
import LoginSelector from "./components/LoginSelector";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div
        className="absolute top-0 left-0 w-full h-[65vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/truck_image.png')" }}
      ></div>

      <div className="relative z-10 flex justify-center items-start mt-[20vh]">
        <div className="bg-white rounded-lg w-full max-w-[80vw] h-[619px] px-4 md:px-0 flex items-center justify-center">
          <LoginSelector />
        </div>
      </div>
    </div>
  );
}
