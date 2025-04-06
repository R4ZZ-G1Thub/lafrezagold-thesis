import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import Button from "../Button";
import ConfirmAlert from "../ConfirmAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const StaffTable = () => {
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/lafreza-server/admin/fetch_staff.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const result = await response.json();

        if (response.ok) {
          const sortedData = result.data.sort((a, b) => a.id - b.id);
          setStaff(sortedData);
          setLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to load staff accounts");
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

  const deleteStaff = async (id) => {
    try {
      const response = await fetch(
        "http://localhost/lafreza-server/admin/delete_staff.php",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log("Response: ", result);

      if (response.ok && result.success) {
        setStaff((prevStaff) => prevStaff.filter((staff) => staff.id !== id));
        toast.success("Staff account deleted successfully.");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log("An error occured: ", error);
      setErrorMessage("An unexpected error occured. Please try again later.");
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedStaff(id);
    setShowConfirm(true);
  };

  const handleCancel = async () => {
    setShowConfirm(false);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    await deleteStaff(selectedStaff);
  };

  return (
    <table className="w-full">
      <thead className="mb-2">
        <tr className="mb-2">
          <th className="w-14">#</th>
          <th className="w-2/5">Name</th>
          <th className="w-1/5">Username</th>
          <th className="w-2/5">Email</th>
          <th className="w-1/5"></th>
        </tr>
      </thead>
      <tbody>
        {staff.map((staff, index) => (
          <tr key={staff.id} className=" py-1">
            <td className="w-14 py-1 px-2 border">{index + 1}</td>
            <td className="w-1/5 py-1 px-2 border">{staff.staff_name}</td>
            <td className="w-1/5 py-1 px-2 border">{staff.staff_username}</td>
            <td className="w-1/5 py-1 px-2 border">{staff.staff_email}</td>
            <td className="w-1/5 py-1 px-2">
              <div className="flex justify-center gap-2 ">
                <Button
                  buttonName={"Edit"}
                  buttonColor={"bg-blue-600"}
                  buttonHoverColor={"hover:bg-blue-500"}
                  onClickFunction={() => {
                    navigate("/admin/edit-staff");
                  }}
                />
                <Button
                  buttonName={"Delete"}
                  buttonColor={"bg-red-600"}
                  buttonHoverColor={"hover:bg-red-500"}
                  onClickFunction={() => handleDeleteClick(staff.id)}
                />

                {showConfirm && selectedStaff === staff.id && (
                  <ConfirmAlert
                    message="Are you sure you want to delete this staff account? This action cannot be undone."
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                  />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffTable;
