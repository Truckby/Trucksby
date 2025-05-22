import React from 'react';
import Home from '../pages/common/Home/Home.jsx';
import Login from '../pages/common/Login/Login.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';
import PrivacyPage from '../pages/common/Privacy/PrivacyPage.jsx';
import SellerProfile from '../pages/common/Profile/SellerProfile.jsx';
import SignUp from '../pages/common/Signup/SignUp.jsx';
import AddTruckPage from '../pages/seller/AddTruck/AddTruckPage.jsx';
import Plans from '../pages/seller/Plans/Plans.jsx';
import SuccessPage from '../pages/seller/Plans/components/ConfirmModal.jsx';
import DetailPage from '../pages/common/Detail/DetailPage.jsx';
import FilterPage from '../pages/common/Filter/FilterPage.jsx';
import Listing from '../pages/seller/Listing/Listing.jsx';

const routes = [
  //seller
  { path: "/seller/listing", element: <Listing />, protected: true, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/seller/add-truck", element: <AddTruckPage />, protected: true, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/seller/edit-truck", element: <AddTruckPage />, protected: true, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/seller/profile", element: <SellerProfile />, protected: true, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/seller/success", element: <SuccessPage />, protected: true, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/seller/plans", element: <Plans />, protected: true, authRedirect: false, showHeader: true, showFooter: true },

  //common
  { path: "/", element: <Home />, protected: false, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/login", element: <Login />, protected: false, authRedirect: true, showHeader: true, showFooter: true },
  { path: "/filter", element: <FilterPage />, protected: false, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/detail", element: <DetailPage />, protected: false, authRedirect: false, showHeader: true, showFooter: true },
  { path: "/signup", element: <SignUp />, protected: false, authRedirect: true, showHeader: true, showFooter: true },
  { path: "/privacy", element: <PrivacyPage />, protected: false, authRedirect: false, showHeader: true, showFooter: true },
  { path: "*", element: <NotFound />, protected: false, authRedirect: false, showHeader: false, showFooter: false },
];

export default routes;
