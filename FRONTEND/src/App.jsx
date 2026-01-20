import { useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import OfflineDetector from "./shared/OfflineDetector";
import Navbar from "./layout/Navbar";
import ScrollUpButton from "./components/ScrollUpButton";
import { useScrollRestoration } from "./hooks/useScrollRestoration";

const App = () => {
  const location = useLocation();
  useScrollRestoration()

  const hideNavbarRoutes = ["/"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

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
