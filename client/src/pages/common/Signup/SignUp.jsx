import React, { useEffect } from "react";
import SignupSelector from "./components/SignupSelector";
import bgImage from '../../../assets/images/truck_image.png';
import ReactGA from "react-ga4";

export default function SignUp() {
  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.send({ hitType: "pageview", page: "/signup", title: "Signup Page" });
    }
  }, []);

  return (
    <div>
      <div className="min-h-screen flex flex-col px-4 relative">
        <div
          className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <div className="relative z-10 flex justify-center items-start my-[20vh]">
          <div className="bg-white shadow rounded-lg w-full max-w-[883px] h-[835px] px-4 md:px-0 flex items-center justify-center">
            <SignupSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
