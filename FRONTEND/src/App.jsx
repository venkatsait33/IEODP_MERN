import { useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import OfflineDetector from "./shared/OfflineDetector";
import Navbar from "./layout/Navbar";
import ScrollUpButton from "./components/ScrollUpButton";
import { useScrollRestoration } from "./hooks/useScrollRestoration";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./auth/authSlice";

const App = () => {
  const location = useLocation();
  useScrollRestoration();
  const dispatch = useDispatch();

  const hideNavbarRoutes = ["/"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(
        setCredentials({
          user: JSON.parse(user),
          accessToken: token,
        }),
      );
    }
  }, []);

  return (
    <div className=" h-screen ">
      {!shouldHideNavbar && <Navbar />}
      <div className="mt-14">
        <OfflineDetector />
        <AppRoutes />
        <Footer />
        <ScrollUpButton />
      </div>
    </div>
  );
};

export default App;
