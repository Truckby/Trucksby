import React from "react";
import Loader from "./components/Loader/Loader";
import Router from "./router/Router";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


const App = () => {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;

  return (
    <div>
      {loading && <Loader />}
      <ScrollToTop />
      <Router />
    </div>
  );
};

export default App;
