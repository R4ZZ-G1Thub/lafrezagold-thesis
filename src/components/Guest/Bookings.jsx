import React from "react";
import AccCard from "./AccCard";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Bookings = () => {
  return (
    <div id="accommodations" className="h-screen bookings-background relative">
      <div className="content text-gray-900 relative w-full h-screen px-8 pt-20 sm:px-28 sm:pt-28 flex flex-col items-center">
        <div className=" w-full flex flex-col items-center mb-5">
          <div className="text-lg 2xl:text-[1.2rem]">ACCOMMODATIONS</div>
          <div className="text-3xl 2xl:text-[2rem] font-bold 2xl:mb-10">
            EXPLORE OUR OFFERS
          </div>
        </div>
        <div className="2xl:mb-8">
          <AccCard />
        </div>
        <div className="text-gray-100 mt-48 sm:mt-6">
          <Link
            to="/accommodations"
            className="flex items-center hover:text-yellow-400"
          >
            View All <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
