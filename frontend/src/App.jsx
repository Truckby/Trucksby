// App.jsx
import React from "react";
import Loader from "./components/Loader/Loader";
import Router from "./router/Router";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;

  return (
  <div>
     {loading && <Loader />}
     <Header/>
     <Router />
     <Footer/>
  </div>
  );
};

export default App;
