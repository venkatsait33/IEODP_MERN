import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { Bell, Moon, Sun } from "lucide-react";
import MotionDiv from "../utils/MotionDiv";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold tab tab-active"
      : "hover:text-primary transition tab";
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="fixed  inset-x-0 top-0 z-10  backdrop-blur-md border-b border-primary/20  shadow-lg">
      <MotionDiv delay={0.1}>
        <div className="navbar bg-base-100 shadow-sm md:px-10 max-sm:px-2 ">
          <div className="md:flex-1 max-sm:navbar-start  max-sm:flex max-sm:items-center">
            <div className="dropdown hidden max-sm:flex">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="tabs tabs-border   max-sm:flex-col dropdown-content bg-base-100 rounded-box z-1 w-52 max-sm:mt-12 p-2 shadow"
              >
                <li>
                  {" "}
                  <NavLink to="/" role="tab" className={linkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" role="tab" className={linkClass}>
                    About
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/support" role="tab" className={linkClass}>
                    Support
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/contact" role="tab" className={linkClass}>
                    Contact
                  </NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/faq" role="tab" className={linkClass}>
                    Faq
                  </NavLink>
                </li>
              </ul>
            </div>
            <Link to="/" className="text-xl font-semibold">
              IEODP
            </Link>
          </div>
          <div className="max-sm:hidden ">
            <div>
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered   md:w-auto"
              />
            </div>
          </div>
          <div role="tablist" className="tabs tabs-border hidden lg:flex">
            <NavLink to="/" role="tab" className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/about" role="tab" className={linkClass}>
              About
            </NavLink>

            <NavLink to="/support" role="tab" className={linkClass}>
              Support
            </NavLink>

            <NavLink to="/contact" role="tab" className={linkClass}>
              Contact
            </NavLink>
            <NavLink to="/faq" role="tab" className={linkClass}>
              Faq
            </NavLink>
          </div>
          <div className="navbar-end ">
            <div className="flex justify-between items-center gap-4 max-sm:gap-2">
              <div>
                <label className="swap swap-rotate mt-1">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value="dark"
                  />

                  {/* sun icon */}
                  <Sun className="swap-on md:h-8 md:w-8 w-6 h-6 fill-current" />

                  {/* moon icon */}

                  <Moon className="swap-off md:h-8 md:w-8 w-6 h-6 fill-current" />
                </label>
              </div>
              <div className="dropdown dropdown-end  block">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <Bell className="" />
                    <span className="badge badge-sm indicator-item">0</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 md:w-62 shadow"
                >
                  <div className="card-body">
                    <span className="text-sm label">
                      There a no notifications available{" "}
                    </span>
                  </div>
                </div>
              </div>
              {user && (
                <div>
                  <div className=" ">
                    <div className="flex border-l md:pl-2 border-gray-300 justify-between items-center md:gap-3 max-sm:gap-1 ">
                      <figure className="w-12 max-sm:w-10 cursor-pointer">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          className="rounded-full p-1"
                        />
                      </figure>
                      <div>
                        <h1 className=" font-semibold max-sm:text-sm">
                          {user.userName || "User Name"}
                        </h1>
                        <span className="label max-sm:text-xs">
                          {user.role || "Role"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 max-sm:gap-2">
                {/* <h1>UserName</h1> */}
                {!user && (
                  <Link to="/login" className=" btn btn-primary">
                    login
                  </Link>
                )}
                {/* <Link to='/signup' className=' btn btn-secondary'>Signup</Link> */}
                {user && (
                  <div
                    onClick={handleLogout}
                    className=" btn btn-error btn-outline"
                  >
                    Logout
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default Navbar;
