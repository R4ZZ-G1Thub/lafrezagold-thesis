import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import Spinner from "../Spinner";

const AccCard = () => {
  const { id } = useParams();
  const [accommodations, setAccommodations] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(
          "http://localhost/lafreza-server/guest/fetch_accomodation_guest.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const result = await response.json();
        // console.log(result);

        if (response.ok && result.success) {
          setAccommodations(result.data);
          setLoading(false);
        } else {
          setErrorMessage(result.message || "Failed to load accommodations.");
          setLoading(false);
        }
      } catch (error) {
        console.log("An error occured: ", error);
        setErrorMessage("An unexpected error occured. Please try again later.");
        setLoading(false);
      }
    };
    fetchAccommodation();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;
  }

  const limitAccommodations = accommodations.slice(0, 3);

  return (
    <div className="w-full  flex flex-wrap gap-5 2xl:gap-10 justify-center ">
      {limitAccommodations.map((accommodation) => (
        <a
          key={accommodation.id}
          href=""
          className="bg-gray-100 w-80 sm:w-64 h-40 sm:h-full 2xl:w-[380px] 2xl:h-[500px] rounded-lg shadow-xl overflow-hidden transition delay-50 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          <div
            key={accommodation.id}
            className="w-full 2xl:h-48 p-2 sm:flex-col flex"
          >
            <img
              src={accommodation.image_path || "../../images/gazebo.jpg"} // Show the dynamic image or fallback
              alt={accommodation.accomodation_name}
              className="object-cover sm:w-full w-full h-full rounded-md"
            />
            <div className="text-content px-3 py-2 flex flex-col">
              <div>
                <h1 className="sm:text-lg text-md font-bold mb-2">
                  {accommodation.accomodation_name}
                </h1>
                <ul>
                  <li className="text-gray-500 sm:text-base text-xs">
                    {accommodation.accomodation_type}
                  </li>
                  <li className="text-gray-500 sm:text-base text-xs">
                    Capacity: {accommodation.capacity}
                  </li>
                  <li className="text-gray-500 sm:text-base text-xs">
                    Features:{" "}
                    {accommodation.features.length > 20
                      ? `${accommodation.features.slice(0, 20)}...`
                      : accommodation.features}
                  </li>
                </ul>
              </div>
              <div className="text-yellow-400 font-bold mt-5 sm:text-base text-xs">
                ₱ {accommodation.price}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default AccCard;
