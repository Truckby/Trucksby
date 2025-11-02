import React, { useEffect } from "react";
import Loader from "./components/Loader/Loader";
import Router from "./router/Router";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ReactGA from "react-ga4";

const App = () => {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;

  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID);
    }
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <ScrollToTop />
      <Router />
    </div>
  );
};

export default App;
