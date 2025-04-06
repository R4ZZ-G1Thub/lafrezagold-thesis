import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "../../components/Spinner";

const CreateNewAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const navigate = useNavigate();
  const { admin_id } = useParams();

  // Fetch the current admin details (simulate fetch for this example)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost/lafreza-server/admin/edit_admin.php?admin_id=${admin_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const result = await response.json();
        console.log("API Response: ", result);

        if (response.ok) {
          setAdmin({
            firstName: result.firstName,
            lastName: result.lastName,
            username: result.username,
          });
          setEditData({
            firstName: result.firstName,
            lastName: result.lastName,
            username: result.username,
          });
          setLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to load admin details");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const editName = async () => {
    const dataToSend = { ...editData, admin_id: admin_id }; // Add admin_id here
    console.log("Sending data:", dataToSend); // Log the data being sent
    try {
      const response = await fetch(
        "http://localhost/lafreza-server/admin/edit_admin.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log("Result:", result); // Check the response

      if (result.success) {
        toast.success(result.message);
        setAdmin({ ...editData }); // Update admin details after successful edit
        setIsEditing(false); // Exit edit mode
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the admin details.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="flex justify-center mt-3">
      <div className="back-container">
        <Link to={"/admin/manage-admins"} className="flex items-center">
          <FaArrowLeft className="mr-2" /> Back
        </Link>
      </div>
      <div className="text-gray-900 mt-10 flex flex-col justify-between sm:w-[600px] xs:w-[400px]">
        <div className="content flex w-full justify-between">
          <div className="admin-fullname w-2/3">
            <div className="flex gap-4">
              <div className="mb-4 flex flex-col ">
                <label htmlFor="firstName" className="text-gray-500">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleInputChange}
                    className="rounded py-2 px-3 bg-gray-200 text-gray-900"
                  />
                ) : (
                  <span>{admin.firstName}</span>
                )}
              </div>
              <div className="mb-4 flex flex-col w-1/3">
                <label htmlFor="lastName" className="text-gray-500">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleInputChange}
                    className="rounded py-2 px-3 bg-gray-200 text-gray-900"
                  />
                ) : (
                  <span>{admin.lastName}</span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="username" className="text-gray-500">
              Username
            </label>
            {isEditing ? (
              <input
                type="text"
                id="username"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                className="rounded py-2 px-3 bg-gray-200 text-gray-900 w-full"
              />
            ) : (
              <span>{admin.username}</span>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          {isEditing ? (
            <>
              <Button
                buttonColor={"bg-yellow-400"}
                buttonHoverColor={"bg-yellow-300"}
                buttonName={"Save Changes"}
                buttonWidth={"w-full"}
                onClickFunction={editName}
              />
              <Button
                buttonColor={"bg-gray-400"}
                buttonHoverColor={"bg-gray-300"}
                buttonName={"Cancel"}
                buttonWidth={"w-full"}
                onClickFunction={() => setIsEditing(false)}
              />
            </>
          ) : (
            <Button
              buttonColor={"bg-blue-400"}
              buttonHoverColor={"bg-blue-300"}
              buttonName={"Edit Names"}
              buttonWidth={"w-full"}
              onClickFunction={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNewAdmin;
