import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState();
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/accomodations": "Accommodations",
    "/admin/accomodation/:id": "",
    "/admin/add-accomodations": "Add Accommodation",
    "/admin/reservations": "Reservations",
    "/admin/reservations-history": "Reservation History",
    "/admin/reservations-calendar": "Reservation Calendar",
    "/admin/guests": "Guests",
    "/admin/guests-history": "Guest History",
    "/admin/guests-feedback": "Guest Feedbacks",
    "/admin/manage-staff": "Manage Staff",
    "/admin/create-new-staff": "Create new staff",
    "/admin/edit-staff": "Edit Staff",
    "/admin/manage-admins": "Manage Admins",
    "/admin/create-new-admin": "Create new admin",
    "/admin/edit-admin/:admin_id": "Edit Admin",
    "/admin/reports": "Reports",
    "/admin/transactions": "Transactions",
    "/admin/refund-requests": "Refund Requests",

    "/staff": "Dashboard",
    "/staff/guests": "Guests",
    "/staff/guests-history": "Guest History",
    "/staff/guests-feedback": "Guest Feedbacks",
    "/staff/reservations": "Reservations",
    "/staff/reservations-history": "Reservation History",
    "/staff/reservations-calendar": "Reservation Calendar",
    "/staff/transactions": "Transactions",
    "/staff/refund-requests": "Refund Requests",
  };

  // logic and fallback
  const title = pageTitles[location.pathname];

  const toggleDropdown = (dropdown) => {
    // so this basically says: is this dropdown already open? if not the drop down eyy
    setActiveDropdown((prev) => !prev);
  };

  return (
    <div className="flex justify-between text-gray-900 h-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="relatie profile-icon flex flex-col items-center mr-3">
        <h className="absolute top-200 right-8 w-40 text-gray-900 px-3 py-4">
          Hi
        </h>

        {/* <button className="flex mb-4" onClick={toggleDropdown}>
          <FaUserCircle size={28} className="mr-1" />
          <RiArrowDropDownLine size={28} /> 
        </button> */}

        {/* {activeDropdown && (
          <ul className="absolute top-20 right-8 w-40 bg-gray-900 rounded-lg text-gray-100 px-3 py-4">
            <li>
              <a
                href="#"
                className="flex hover:bg-gray-800 w-full py-2 px-3 rounded-lg"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex hover:bg-gray-800 w-full py-2 px-3 rounded-lg"
              >
                Log out
              </a>
            </li>
          </ul>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
