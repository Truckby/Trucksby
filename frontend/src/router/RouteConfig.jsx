import Login from '../pages/common/Login/Login.jsx';
import Redirect from '../pages/common/Redirect/Redirect.jsx';
import NotFound from '../pages/common/NotFound/NotFound.jsx';
import Home from '../pages/common/Home/Home.jsx';
import UserHome from '../pages/user/Home/Home.jsx';
import UserBooking from '../pages/user/booking/Booking.jsx';
import Dashboard from '../pages/serviceProvider/dashboard/Dashboard.jsx';
import Calendar from '../pages/serviceProvider/calendar/Calendar.jsx';
import SignUp from '../pages/common/signup/SignUp.jsx';
import PrivacyPage from '../pages/common/privacy/PrivacyPage.jsx';
import Profile from '../pages/common/profile/Profile.jsx';
import FilterPage from '../pages/user/Filter/FilterPage.jsx';
import DetailPage from '../pages/user/Detail/DetailPage.jsx';
import Listing from '../pages/seller/Listing/Listing.jsx';
import AddTruckPage from '../pages/seller/AddTruck/AddTruckPage.jsx';

const routes = [
  //user
  { path: "/user/filter", element: <FilterPage />, protected: true, authRedirect: false },
  { path: "/user/detail", element: <DetailPage />, protected: true, authRedirect: false },

  //service Provider
  { path: "/seller/listing", element: <Listing />, protected: true, authRedirect: false },
  { path: "/seller/add-truck", element: <AddTruckPage />, protected: true, authRedirect: false },

  { path: "/profile", element: <Profile />, protected: true, authRedirect: true },

  //common
  { path: "/", element: <Redirect />, protected: true, authRedirect: false },
  { path: "/login", element: <Login />, protected: false, authRedirect: true },
  { path: "/home", element: <Home />, protected: false, authRedirect: false },
  { path: "/signup", element: <SignUp />, protected: false, authRedirect: true },
  { path: "/PrivacyPage", element: <PrivacyPage />, protected: false, authRedirect: true },
  { path: "*", element: <NotFound />, protected: false },
];

export default routes;
