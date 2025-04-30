import Home from '../pages/common/Home/Home.jsx';
import Login from '../pages/common/Login/Login.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';
import Redirect from '../pages/common/Redirect/Redirect.jsx';
import PrivacyPage from '../pages/common/privacy/PrivacyPage.jsx';
import SellerProfile from '../pages/common/profile/SellerProfile.jsx';
import UserProfile from '../pages/common/profile/UserProfile.jsx';
import SignUp from '../pages/common/signup/SignUp.jsx';
import AddTruckPage from '../pages/seller/AddTruck/AddTruckPage.jsx';
import Listing from '../pages/seller/Listing/Listing.jsx';
import Plans from '../pages/seller/Plans/Plans.jsx';
import SuccessPage from '../pages/seller/Plans/components/ConfirmModal.jsx';
import DetailPage from '../pages/user/Detail/DetailPage.jsx';
import FilterPage from '../pages/user/Filter/FilterPage.jsx';

const routes = [
  //user
  { path: "/user/filter", element: <FilterPage />, protected: false, authRedirect: false },
  { path: "/user/detail", element: <DetailPage />, protected: false, authRedirect: false },
  { path: "/user/profile", element: <UserProfile />, protected: true, authRedirect: true },

  //service Provider
  { path: "/seller/listing", element: <Listing />, protected: true, authRedirect: true },
  { path: "/seller/add-truck", element: <AddTruckPage />, protected: true, authRedirect: true },
  { path: "/seller/profile", element: <SellerProfile />, protected: true, authRedirect: true },

  { path: "/plans", element: <Plans />, protected: false, authRedirect: false },

  //common
  { path: "/", element: <Redirect />, protected: true, authRedirect: false },
  { path: "/login", element: <Login />, protected: false, authRedirect: true },
  { path: "/home", element: <Home />, protected: false, authRedirect: false },
  { path: "/signup", element: <SignUp />, protected: false, authRedirect: true },
  { path: "/PrivacyPage", element: <PrivacyPage />, protected: false, authRedirect: false },
  { path: "/success", element: <SuccessPage />, protected: false, authRedirect: false },
  { path: "*", element: <NotFound />, protected: false },
];

export default routes;
