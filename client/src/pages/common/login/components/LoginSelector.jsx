import LoginForm from "./LoginForm";
import logo from "../../../../assets/images/login_logo.svg"; // ✅ Update this path to your actual image location
import { Link } from "react-router";

const LoginSelector = () => {

  return (
    <div className="w-full mx-auto my-10 sm:p-6 flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" width={177} height={127} className="mb-5" />

      <LoginForm />

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Do not have an account?{" "}
          <Link to="/signup" className="text-[#DF0805] transition-colors">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSelector;
