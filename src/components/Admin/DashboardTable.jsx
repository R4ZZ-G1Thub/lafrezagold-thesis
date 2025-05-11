import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

const DashboardTable = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/lafreza-server/admin/fetch_reservations.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const result = await response.json();
        console.log("API Response: ", result);

        if (response.ok) {
          const sortedData = result.data.sort((a, b) => a.id - b.id);
          setReservations(sortedData);
          setLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to load accommodations");
          setLoading(false);
        }
      } catch (error) {
        console.log("An error occured: ", error);
        setErrorMessage("An unexpected error occured. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Recent Reservations</h1>
      <table className="w-full mb-4 mt-5">
        <thead className="mb-2">
          <tr className="mb-2">
            <th className="w-1/12">ID</th>
            <th className="w-1/6">Guest ID</th>
            <th className="w-1/6">Accommodation</th>
            <th className="w-1/4">Date</th>
            <th className="w-1/6">Total Price</th>
            <th className="w-1/6">Update</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id} className="py-1">
              <td className="w-10 py-1 px-2 border">
                {reservation.reservation_id}
              </td>
              <td className="w-1/6 py-1 px-2 border">
                {reservation.guest_name}
              </td>
              <td className="w-1/6 py-1 px-2 border">
                {reservation.accomodation_name}
              </td>
              <td className="w-1/6 py-1 px-2 border">
                {reservation.date_from} to {reservation.date_to}
              </td>
              <td className="w-1/6 py-1 px-2 border">
                Php {reservation.total_price}
              </td>
              <td className="w-1/6 py-1 px-2 border">
                {reservation.updated_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
