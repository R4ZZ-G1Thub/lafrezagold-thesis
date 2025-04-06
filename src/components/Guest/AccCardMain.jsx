import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AccCardMain = ({ accommodation }) => {
  return (
    <div className="rounded-lg w-full mt-5 sm:mt-0 sm:h-60 bg-gray-100 shadow-lg py-3 px-4 flex gap-4">
      <div className="image w-[400px]">
        <img
          src={accommodation.image_path || "../../images/gazebo.jpg"} // Show the dynamic image or fallback
          alt={accommodation.accomodation_name}
          className="object-cover sm:w-full w-full h-full rounded-md"
        />
      </div>
      <div className="text flex flex-col justify-between w-full sm:pr-2 ">
        <div>
          <h1 className="sm:text-lg 2xl:text-xl text-md font-bold mb-2">
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
              Features: {accommodation.features}
            </li>
          </ul>
        </div>
        <div className="text-yellow-400  sm:text-base text-xs flex justify-between items-center flex-col sm:flex-row mt-5 ">
          <div className="font-extrabold 2xl:text-xl">
            Php {accommodation.price}
          </div>
          <Link
            to={`/accommodations/${accommodation.id}`}
            className="hover:text-yellow-300 font-extrabold"
          >
            See more <FaArrowRight className="inline ml-1" />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccCardMain;
