import React, { useState, useEffect } from "react";
import Button from "../Button";
import Spinner from "../Spinner";
import ConfirmAlert from "../ConfirmAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminTables = () => {
  const [admin, setAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/lafreza-server/admin/fetch_admin.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const result = await response.json();

        if (response.ok) {
          const sortedData = result.data.sort((a, b) => a.id - b.id);
          setAdmin(sortedData);
          setLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to load admin accounts");
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

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(
        "http://localhost/lafreza-server/admin/delete_admin.php",
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
        setAdmin((prevAdmin) =>
          prevAdmin.filter((admin) => admin.admin_id !== id)
        );
        toast.success("Admin account deleted successfully.");
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
    setSelectedAdmin(id);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    await deleteAdmin(selectedAdmin);
  };

  const handleCancel = async () => {
    setShowConfirm(false);
  };

  return (
    <section className="admin">
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
          {admin.map((admin, index) => (
            <tr key={admin.admin_id} className=" py-1">
              <td className="w-14 py-1 px-2 border">{index + 1}</td>
              <td className="w-1/5 py-1 px-2 border">{admin.admin_name}</td>
              <td className="w-1/5 py-1 px-2 border">{admin.admin_username}</td>
              <td className="w-1/5 py-1 px-2 border">{admin.admin_email}</td>
              <td className="w-1/5 py-1 px-2">
                <div className="flex justify-center gap-2 ">
                  <Button
                    buttonName={"Edit"}
                    buttonColor={"bg-blue-600"}
                    buttonHoverColor={"hover:bg-blue-500"}
                    onClickFunction={() => {
                      navigate(`/admin/edit-admin/${admin.admin_id}`);
                    }}
                  />
                  <Button
                    buttonName={"Delete"}
                    buttonColor={"bg-red-600"}
                    buttonHoverColor={"hover:bg-red-500"}
                    onClickFunction={() => handleDeleteClick(admin.admin_id)}
                  />

                  {showConfirm && selectedAdmin === admin.admin_id && (
                    <ConfirmAlert
                      message="Are you sure you want to delete this admin account? This action cannot be undone."
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
    </section>
  );
};

export default AdminTables;
