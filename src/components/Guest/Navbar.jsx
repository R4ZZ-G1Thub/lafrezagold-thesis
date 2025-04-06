import React, { useState, useEffect } from "react";
import { FaBars, FaCartShopping, FaX } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import Button from "../Button";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeDropdown, setActiveDropdown] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkSession = () => {
    setLoading(true);
    axios
      .get("http://localhost/lafreza-server/guest/check_session.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setUserEmail(response.data.email);
          console.log("User is logged in");
        } else {
          setIsLoggedIn(false);
          console.log("User is not logged in");
        }
      })
      .catch((error) => {
        console.error("Error checking session: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    checkSession();
  }, []);

  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost/lafreza-server/guest/guest_logout.php", {
        withCredentials: true,
      })
      .then(() => {
        setIsLoggedIn(false);
        setActiveDropdown(false);
        navigate("/");
        checkSession();
        localStorage.removeItem("guest_id");
        toast.success("Successfully logged out.");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Error logging out.");
      });
  };

  return (
    <div className="bg-black bg-opacity-40 text-gray-200 sm:flex sm:justify-between sm:px-36 py-2 px-6 fixed w-full z-50">
      <div className="py-4 px-6 flex justify-between items-center">
        <div className="font-bold">LAFREZA GOLD</div>
        <button onClick={ToggleMenu} className="sm:hidden">
          <FaX className={`${isOpen ? "block" : "hidden"}`} />
          <FaBars className={`${!isOpen ? "block" : "hidden"}`} />
        </button>
      </div>
      <div
        className={`px-4 ${
          isOpen ? "block" : "hidden"
        } sm:flex sm:items-center`}
      >
        <ul className="sm:flex mb-8 sm:mb-0 sm:mr-12">
          <li className="">
            <a
              href="/"
              className="hover:text-yellow-400 rounded sm:bg-none block px-2 py-1 sm:mr-3"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/#about"
              className="hover:text-yellow-400 rounded block px-2 py-1 mt-1 sm:mt-0 sm:mr-3"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/#accommodations"
              className="hover:text-yellow-400 rounded block px-2 py-1 mt-1 sm:mt-0 sm:mr-3"
            >
              Accommodations
            </a>
          </li>
          <li>
            <a
              href="/#amenities"
              className="hover:text-yellow-400 rounded block px-2 py-1 mt-1 sm:mt-0"
            >
              Amenities
            </a>
          </li>
          <li>
            <a
              href="/#contact-us"
              className="hover:text-yellow-400 rounded block px-2 py-1 mt-1 sm:mt-0"
            >
              Contact us
            </a>
          </li>
        </ul>
        {loading ? (
          <p className="text-yellow-400">Loading...</p>
        ) : isLoggedIn ? (
          <div className="relative flex items-center gap-5">
            <Link to="/cart" className="flex items-center text-yellow-400">
              <FaCartShopping size={24} />
            </Link>
            <button
              className="flex items-center text-yellow-400"
              onClick={toggleDropdown}
            >
              <FaUserCircle size={28} className="mr-" />
              <RiArrowDropDownLine size={28} />
            </button>
            {activeDropdown && (
              <ul className="absolute top-10 right-1 bg-gray-100 rounded-lg text-gray-900 px-2 py-2 shadow-lg">
                <li className="flex w-full py-2 px-3 rounded-lg text-gray-400 border-gray-400">
                  <span>{userEmail}</span>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="flex hover:bg-gray-200 w-full py-2 px-3 rounded-lg"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex hover:bg-gray-200 w-full py-2 px-3 rounded-lg"
                  >
                    Log out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Button
            onClickFunction={() => navigate("/login")}
            buttonName={"Login"}
            buttonColor={"bg-yellow-400"}
            buttonHoverColor={"hover:bg-yellow-300"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
