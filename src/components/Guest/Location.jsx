import React from "react";
import { FaMapMarker } from "react-icons/fa";
import Map from "../../components/Guest/Map";

const Location = () => {
  return (
    <div className="bg-gray-100 w-[340px] sm:w-[1000px] 2xl:w-[1300px] shadow-lg rounded-lg p-5 sm:px-14 2xl:px-20 mb-10">
      <div className="date font-bold">Location</div>
      <div className="mb-3 flex items-center">
        <FaMapMarker className="text-yellow-300 z-0" />{" "}
        <span className="ml-2 ">
          Sitio Crossing Nagbalayong , Morong, Philippines
        </span>
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
};

export default Location;
