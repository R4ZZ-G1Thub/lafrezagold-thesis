import React, { useState } from "react";
import FeatureInput from "../../components/Admin/FeatureInput";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Accommodation name is required"),
    type: yup.string().required("Accommodation type is required"),
    capacity: yup
      .number()
      .required("Capacity is required")
      .min(1, "Capacity must be greater than 0")
      .max(50, "Capacity cannot exceed 50 guests"),
    price: yup
      .number()
      .required("Price is required")
      .min(1, "Price must be greater than 0")
      .max(50000, "Price cannot exceed Php 50,000"),
  })
  .required();

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const onSubmit = async (data) => {
    const { name, type, features, capacity, price } = data;
    console.log("data:", data);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);

    const featuresString = (features || []).join(", ");
    formData.append("features", featuresString);
    formData.append("capacity", capacity);
    formData.append("price", price);

    images.forEach((image) => {
      formData.append("images[]", image);
    });

    // log form data individually
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch(
        "http://localhost/lafreza-server/admin/add_accomodations.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();
      console.log("Server response:", result);

      if (result.success) {
        navigate("/admin/accomodations");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return (
    <section className="w-2/5 mx-auto py-4 mb-4 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container text-gray-900"
        encType="multipart/form-data"
      >
        <section className="flex mb-4">
          <div className="name w-2/3">
            <label htmlFor="name" className="block text-lg pb-1">
              Accomodation Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="eg. Deluxe Room"
              {...register("name")}
              className="border rounded py-2 px-3 focus:border-gray-400 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="type w-1/3 ml-4">
            <label htmlFor="type" className="block text-lg pb-1">
              Type
            </label>
            <select
              name="type"
              id="type"
              {...register("type")}
              className="border rounded py-2 px-3 focus:border-gray-400 w-full"
            >
              <option value="Room">Room</option>
              <option value="Cottage">Cottage</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
        </section>
        <section className="mb-4">
          <label className="block text-lg pb-1">Features</label>
          <FeatureInput
            setValue={setValue}
            featuresField={watch("features") || []}
          />
        </section>
        <section className="flex mb-4">
          <div className="capacity w-1/3">
            <label htmlFor="capacity" className="block text-lg pb-1">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              placeholder="0"
              {...register("capacity")}
              className="border rounded py-2 px-3 focus:border-gray-400 w-full"
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm">{errors.capacity.message}</p>
            )}
          </div>
          <div className="price w-full ml-4">
            <label htmlFor="price" className="block text-lg pb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter amount"
              {...register("price")}
              className="border rounded py-2 px-3 focus:border-gray-400 w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        </section>
        <section className="mb-8">
          <label htmlFor="images" className="block text-lg pb-1">
            Upload images:
          </label>
          <input
            id="images"
            type="file"
            name="images[]"
            multiple
            onChange={handleFileChange}
          />
        </section>
        <div className="flex justify-center">
          <Button
            buttonName={"Add Accomodation"}
            buttonColor={"bg-yellow-400"}
            buttonHoverColor={"hover:bg-yellow-300"}
          />
        </div>
      </form>
    </section>
  );
};

export default AddRoom;
