import React, { useState } from "react";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const GuestLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost/lafreza-server/guest/guest_login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Server response: ", result);

      if (result.success) {
        toast.success(result.message);
        localStorage.setItem("guest_id", result.data.guest_id);
        navigate("/");
        setTimeout(() => {
          navigate(0);
        }, 2000);
      } else {
        localStorage.removeItem("guest_id");
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log("An error occured: ", error);
      setErrorMessage("An unexpected error occured. Please try again later.");
    }
  };

  return (
    <div className="w-full h-screen sm:pt-5 flex flex-col justify-center items-center guest-form-bg overflow-x-hidden">
      <div className="h-[360px] sm:w-[500px] w-[300px] rounded-lg shadow-xl bg-gray-100 px-6 py-5">
        <div className="w-full flex flex-col items-center text-xs sm:text-sm mb-4">
          <h1 className="font-bold text-base sm:text-xl">
            Log in to your account
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="content mb-10">
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("email")}
                placeholder="Email"
                className="rounded py-2 px-3 w-full bg-gray-200"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
                placeholder="Password"
                className="rounded py-2 px-3 w-full bg-gray-200"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <Link to="/sign-up" className="text-yellow-400 underline">
              Already have an account?
            </Link>
          </div>
          <div className="submit-button">
            <Button
              buttonName={"Sign in"}
              buttonColor={"bg-yellow-400"}
              buttonHoverColor={"hover:bg-yellow-400"}
              buttonWidth={"w-full"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestLogin;
