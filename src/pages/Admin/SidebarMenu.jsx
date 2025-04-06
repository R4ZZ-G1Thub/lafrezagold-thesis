import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHouse,
  FaDoorClosed,
  FaCalendar,
  FaUser,
  FaUsers,
  FaReceipt,
  FaCreditCard,
  FaBars,
} from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

const SidebarMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost/lafreza-server/admin/admin_logout.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(),
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        navigate("/admin-login");
      }
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  };

  const [activeDropdown, setActiveDropdown] = useState("");

  // setActiveDropdown naguupdate ng activeDropdown state and keeps track if it is currently active or nah
  // so bali Clicking on an already-open dropdown closes it.
  const toggleDropdown = (dropdown) => {
    // so this basically says: is this dropdown already open? if not the drop down eyy
    setActiveDropdown((prev) => (prev === dropdown ? "" : dropdown));
  };

  return (
    <aside id="default-sidebar" className="fixed w-64 h-screen">
      <div className="h-full px-4 py-5 overflow-y-auto">
        {/* whole sidebar content */}
        <div className="sidebar-content flex flex-col justify-between h-full">
          <div className="logo-and-content">
            <div className="logo mb-6 px-3">
              <span className="text-xl font-semibold text-gray-900 ">
                LA FREZA GOLD
              </span>
            </div>
            <ul className="">
              <li>
                <Link
                  to="/admin"
                  className="flex items-center text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg cursor-pointer"
                >
                  <FaHouse className="mr-4 items-center" size={18} />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* ROOMS TOGGLE */}
              <li>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-7 cursor-pointer"
                  onClick={() => toggleDropdown("accomodations")}
                  aria-expanded={activeDropdown === "accomodations"}
                  aria-controls="dropdown-accomodations"
                >
                  <div className="flex items-center">
                    <FaDoorClosed className="mr-4" size={18} />
                    <span>Accommodations</span>
                  </div>
                  <RiArrowDropDownLine size={28} className="items-center" />
                </button>
                <ul
                  id="dropdown-rooms"
                  className={`${
                    activeDropdown === "accomodations" ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/accomodations"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      All Accommodations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/add-accomodations"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      Add Accommodation
                    </Link>
                  </li>
                </ul>
              </li>

              {/* GUESTS TOGGLE */}
              <li>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-75"
                  onClick={() => toggleDropdown("guests")}
                  aria-expanded={activeDropdown === "guests"}
                  aria-controls="dropdown-guests"
                >
                  <div className="flex items-center">
                    <FaUser className="mr-4" size={18} />
                    <span>Guests</span>
                  </div>
                  <RiArrowDropDownLine size={28} className="items-center" />
                </button>
                <ul
                  id="dropdown-guests"
                  className={`${
                    activeDropdown === "guests" ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/guests"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      All Guests
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/guests-feedback"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      Guest Feedback
                    </Link>
                  </li>
                </ul>
              </li>

              {/* RESERVATIONS TOGGLE */}
              <li>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-75"
                  onClick={() => toggleDropdown("reservations")}
                  aria-expanded={activeDropdown === "reservations"}
                  aria-controls="dropdown-reservations"
                >
                  <div className="flex items-center">
                    <FaCalendar className="mr-4" size={18} />
                    <span>Reservations</span>
                  </div>
                  <RiArrowDropDownLine size={28} className="items-center" />
                </button>
                <ul
                  id="dropdown-reservations"
                  className={`${
                    activeDropdown === "reservations" ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/reservations"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      All Reservations
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/reservations-history"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      Reservation History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/reservations-calendar"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      Calendar
                    </Link>
                  </li>
                </ul>
              </li>

              {/* TRANSACTIONS TOGGLE */}
              <li>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-75"
                  onClick={() => toggleDropdown("transactions")}
                  aria-expanded={activeDropdown === "transactions"}
                  aria-controls="dropdown-transactions"
                >
                  <div className="flex items-center">
                    <FaCreditCard className="mr-4" size={18} />
                    <span>Transactions</span>
                  </div>
                  <RiArrowDropDownLine size={28} className="items-center" />
                </button>
                <ul
                  id="dropdown-transactions"
                  className={`${
                    activeDropdown === "transactions" ? "block" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      to="/admin/transactions"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      All Transactions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/refund-requests"
                      className="flex items-center justify-between w-full pl-9 text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg"
                    >
                      Refund Requests
                    </Link>
                  </li>
                </ul>
              </li>

              {/* ADMIN TOGGLE */}
              <li>
                <Link
                  to="/admin/manage-admins"
                  className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-75"
                >
                  <div className="flex items-center">
                    <FaUser className="mr-4" size={18} />
                    <span>Admins</span>
                  </div>
                </Link>
              </li>

              {/* STAFF TOGGLE */}
              <li>
                <Link
                  to="/admin/manage-staff"
                  className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-75"
                >
                  <div className="flex items-center">
                    <FaUsers className="mr-4" size={18} />
                    <span>Staff</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className="profile-menu">
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center justify-between w-full text-gray-900 hover:bg-gray-300 py-2 px-3 rounded-lg transition duration-75"
            >
              <div className="flex items-center">
                <FaSignOutAlt
                  style={{ transform: "rotate(180deg)" }}
                  className="mr-4"
                  size={18}
                />
                <span>Log out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarMenu;
