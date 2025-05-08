import React from "react";
import Loader from "./components/Loader/Loader";
import Router from "./router/Router";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SellerHeader from "./components/SellerHeader";


const App = () => {
  const { counter } = useSelector((state) => state.loader);
  const loading = counter > 0;
  const user = useSelector((state) => state.user.user);

  return (
    <div>
      {loading && <Loader />}
      <ScrollToTop />

      {user?.role === "seller" ? (
        <SellerHeader />
      ) : (
        <Header />
      )
      }

      <Router />
      <Footer />
    </div>
  );
};

export default App;
