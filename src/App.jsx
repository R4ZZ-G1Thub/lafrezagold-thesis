import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AddRoom from "./pages/Admin/AddRoom";
import Dashboard from "./pages/Admin/Dashboard";
import Guests from "./pages/Admin/Guests";
import GuestPage from "./pages/Admin/GuestPage";
import GuestsHistory from "./pages/Admin/GuestsHistory";
import GuestsFeedback from "./pages/Admin/GuestsFeedback";
import ManageStaff from "./pages/Admin/ManageStaff";
import ManageAdmins from "./pages/Admin/ManageAdmins";
import Reservations from "./pages/Admin/Reservations";
import ReservationsHistory from "./pages/Admin/ReservationsHistory";
import ReservationsCalendar from "./pages/Admin/ReservationsCalendar";
import Rooms from "./pages/Admin/Rooms";
import AccommodationPage from "./pages/Admin/AccommodationPage";
import EditAccommodation from "./pages/Admin/EditAccommodation";
import Transactions from "./pages/Admin/Transactions";
import RefundRequests from "./pages/Admin/RefundRequests";




import ProtectedRoutStaff from "./pages/Staff/ProtectedRouteStaff";
import StaffLogin from "./pages/Staff/StaffLogin";
import StaffLayout from "./layouts/StaffLayout";




import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GuestLayout from "./layouts/GuestLayout";
import Homepage from "./pages/Guest/Homepage";
import GuestLogin from "./pages/Guest/GuestLogin";
import GuestSignup from "./pages/Guest/GuestSignup";
import Accommodations from "./pages/Guest/Accommodations";
import CreateNewAdmin from "./pages/Admin/CreateNewAdmin";
import CreateNewStaff from "./pages/Admin/CreateNewStaff";
import EditStaff from "./pages/Admin/EditStaff";
import EditAdmin from "./pages/Admin/EditAdmin";
import SingleAccommodation from "./pages/Guest/SingleAccommodation";
import CartPage from "./pages/Guest/CartPage";
import PaymentPage from "./pages/Guest/PaymentPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin/accomodations" element={<Rooms />} />
          <Route
            path="/admin/accommodation/:id"
            element={<AccommodationPage />}
          />
          <Route path="/admin/add-accomodations" element={<AddRoom />} />
          <Route
            path="/admin/edit-accommodations/:id"
            element={<EditAccommodation />}
          />
          <Route path="/admin/reservations" element={<Reservations />} />
          <Route
            path="/admin/reservations-history"
            element={<ReservationsHistory />}
          />
          <Route
            path="/admin/reservations-calendar"
            element={<ReservationsCalendar />}
          />
          <Route path="/admin/guests" element={<Guests />} />
          <Route path="/admin/guest/:id" element={<GuestPage />} />
          <Route path="/admin/guests-history" element={<GuestsHistory />} />
          <Route path="/admin/guests-feedback" element={<GuestsFeedback />} />
          <Route path="/admin/manage-staff" element={<ManageStaff />} />
          <Route path="/admin/create-new-staff" element={<CreateNewStaff />} />
          <Route path="/admin/edit-staff" element={<EditStaff />} />
          <Route path="/admin/manage-admins" element={<ManageAdmins />} />
          <Route path="/admin/create-new-admin" element={<CreateNewAdmin />} />
          <Route path="/admin/edit-admin/:admin_id" element={<EditAdmin />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/refund-requests" element={<RefundRequests />} />
        </Route>

        <Route path="/staff-login" element={<StaffLogin />} />

        <Route
          path="/staff"
          element={
            <ProtectedRoutStaff>
              <StaffLayout />
            </ProtectedRoutStaff>
          }>
          <Route index element={<Dashboard />} />
          <Route path="/staff/reservations" element={<Reservations />} />
          <Route
            path="/staff/reservations-history"
            element={<ReservationsHistory />}
          />
          <Route
            path="/staff/reservations-calendar"
            element={<ReservationsCalendar />}
          />
          <Route path="/staff/guests" element={<Guests />} />
          <Route path="/staff/guests-feedback" element={<GuestsFeedback />} />
          <Route path="/staff/transactions" element={<Transactions />} />
          <Route path="/staff/refund-requests" element={<RefundRequests />} />

        </Route>

        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<GuestLogin />} />
          <Route path="/sign-up" element={<GuestSignup />} />

          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/accommodations/:id" element={<SingleAccommodation />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PaymentPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
