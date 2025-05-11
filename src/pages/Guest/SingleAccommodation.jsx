import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const SingleAccommodation = ({ initialStatus }) => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState(initialStatus);

  const today = new Date().toISOString().split("T")[0];
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [availabilityError, setAvailabilityError] = useState("");

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const adultEntranceFee = 300;
  const childEntranceFee = 250;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(
          `http://localhost/lafreza-server/guest/guest_fetch_single_accommodation.php?id=${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setAccommodation(result.data.accommodation);
          setImages(result.data.images);
          setStatus(result.data.accommodation.availability);
          setLoading(false);
        } else {
          setErrorMessage(
            setErrorMessage(
              result.message || "Failed to load accommodation details."
            )
          );
          setLoading(false);
        }
      } catch (error) {
        console.log("An error occurred: ", error);
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
        setLoading(false);
      }
    };
    fetchAccommodation();
  }, [id]);

  // calculate number of days
  const calculateDays = (from, to) => {
    if (from && to) {
      const startDate = new Date(from);
      const endDate = new Date(to);
      const timeDiff = endDate - startDate;

      if (timeDiff >= 0) {
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setNumberOfDays(days);
      } else {
        setNumberOfDays(0);
      }
    } else {
      setNumberOfDays(0);
    }
  };

  // handle date change
  const handleDateChange = async (e, type) => {
    const value = e.target.value;
    if (type === "from") {
      setDateFrom(value);
      calculateDays(value, dateTo);
    } else if (type === "to") {
      setDateTo(value);
      calculateDays(dateFrom, value);
    }
  };

  const calculateEntranceFee = () => {
    if (!accommodation) return 0;

    if (accommodation.accomodation_type === "Room") {
      const excessGuests = adults + children - accommodation.capacity;
      if (excessGuests > 0) {
        const excessAdults = Math.min(excessGuests, adults); // Prioritize adults for excess
        const excessChildren = excessGuests - excessAdults;
        return (
          excessAdults * adultEntranceFee + excessChildren * childEntranceFee
        );
      }
    } else if (accommodation.accomodation_type === "Cottage") {
      return adults * adultEntranceFee + children * childEntranceFee;
    }
    return 0;
  };

  const totalEntranceFee = calculateEntranceFee();
  const totalPrice =
    numberOfDays * (accommodation?.price || 0) + totalEntranceFee;

  const guestId = localStorage.getItem("guest_id");

  const handleAddToCart = async () => {
    if (!dateFrom || !dateTo) {
      toast.error("Please input date of reservation.");
      return;
    }

    if (!guestId) {
      navigate("/login");
      return;
    }

    try {
      const cartItem = {
        guest_id: guestId,
        accommodation_id: accommodation.id,
        accommodation_name: accommodation.accomodation_name,
        date_from: dateFrom,
        date_to: dateTo,
        adults,
        children,
        total_price: totalPrice,
      };

      const response = await fetch(
        "http://localhost/lafreza-server/guest/add_to_cart.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Successfully added to cart!");
        navigate("/cart");
      } else {
        console.log("Failed to add to cart", result);
      }
    } catch (error) {
      console.log("Error checking availability: ", error);
    }
  };

  const checkAvailability = async (accommodationId, fromDate, toDate) => {
    try {
      const response = await fetch(
        "http://localhost/lafreza-server/guest/check_availability.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accommodation_id: accommodationId,
            date_from: fromDate,
            date_to: toDate,
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setAvailabilityError("");
      } else {
        setAvailabilityError(data.message);
      }
    } catch (error) {
      console.error("Availability check failed:", error);
      setAvailabilityError("Error checking availability.");
    }
  };

  useEffect(() => {
    if (accommodation && dateFrom && dateTo) {
      checkAvailability(accommodation.id, dateFrom, dateTo);
    }
  }, [dateFrom, dateTo]);

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <p className="text-center mt-10 text-red-500">{errorMessage}</p>;
  }

  return (
    <div className=" w-full min-h-screen pt-24 pb-24 guest-form-bg flex justify-center items-center flex-col">
      {/* <ProgressBar /> */}

      <div className="bg-gray-100 w-[340px] sm:w-[1000px] 2xl:w-[1300px] shadow-lg rounded-lg p-5 sm:px-14 sm:pt-10 2xl:px-20 mb-5">
        <div className="mb-10">
          <Link to="/accommodations" className="flex items-center">
            <FaArrowLeft className="mr-2" /> Back
          </Link>
        </div>
        <div className="main-container flex justify-center">
          <div className="flex sm:justify-center sm:flex-row flex-col">
            <div className="images-carousel w-[300px] sm:w-[380px] sm:h-[230px] sm:mb-0 mb-5 2xl:w-[480px] 2xl:h-[330 px]">
              <Swiper
                style={{ zIndex: 0 }}
                spaceBetween={5}
                slidesPerView={1}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost/lafreza-server${image}`}
                      alt={`Accommodation Image ${index + 1}`}
                      className="rounded-lg w-full h-auto"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {accommodation && (
              <div className="ml-5">
                <h1 className="text-3xl font-bold mb-4">
                  {accommodation.accomodation_name}
                </h1>
                <ul>
                  <li>
                    <span className="text-gray-500">Type: </span>
                    {accommodation.accomodation_type}
                  </li>
                  <li>
                    <span className="text-gray-500">Features: </span>
                    {accommodation.features}
                  </li>
                  <li>
                    <span className="text-gray-500">Capacity: </span>
                    {accommodation.capacity}
                  </li>
                  <li>
                    <span className="text-gray-500">Price: </span>Php{" "}
                    {accommodation.price}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="reservation-date">
          <div className="date mt-10 mb-2 font-bold">Date of Reservation:</div>
          <div className="reservation-date flex sm:gap-10 items-center sm:justify-center flex-wrap mb-3">
            <div className="date-from flex sm:items-center flex-col sm:flex-row">
              <label htmlFor="date-from" className="mr-3">
                From
              </label>
              <input
                type="date"
                id="date-from"
                value={dateFrom}
                min={today}
                onChange={(e) => handleDateChange(e, "from")}
                className="rounded-lg p-2 sm:w-[300px]"
              />
            </div>
            <FaArrowRight size={25} />
            <div className="date-to flex sm:items-center flex-col sm:flex-row">
              <label htmlFor="date-to" className="mr-3">
                To
              </label>
              <input
                type="date"
                id="date-to"
                min={today}
                value={dateFrom || dateTo}
                onChange={(e) => handleDateChange(e, "to")}
                className="rounded-lg p-2 sm:w-[300px]"
              />
            </div>
          </div>
          {availabilityError && (
            <p className="text-center mt-5 text-red-500">{availabilityError}</p>
          )}
          <div className="mt-3 mb-3">
            <span className="font-bold">No. of days:</span>{" "}
            <span>{numberOfDays}</span>
          </div>
          <div className="bg-green-200 py-2 px-4 rounded">
            Overnight Package: Check-in time: 2:00PM | Daytour Package: Check-in
            time: 7:00AM to 6:00PM
          </div>
          <div className="mt-5">
            <div className="font-bold ">Guest Information</div>{" "}
            <div className="italic text-gray-500">
              Entrance fee is required for every guest that exceeds the room
              capacity and for cottage only guests.
            </div>
            <div className="flex sm:gap-5 mt-3 flex-col sm:flex-row">
              <div className="flex flex-col">
                <label htmlFor="adults">
                  Adults (Php {adultEntranceFee} each)
                </label>
                <input
                  type="number"
                  id="adults"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
                  className="rounded-lg p-2 sm:w-[150px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="children">
                  Children (Php {childEntranceFee} each)
                </label>
                <input
                  type="number"
                  id="children"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                  className="rounded-lg p-2 sm:w-[150px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-[340px] sm:w-[1000px] 2xl:w-[1300px] shadow-lg rounded-lg p-5 sm:px-14 2xl:px-20 mb-5">
        <div className="date  font-bold">Price Breakdown</div>
        <div className="mt-3">
          {/* Room Price Breakdown */}
          {numberOfDays > 0 ? (
            <p>
              <span className="text-gray-500">Room Price:</span> Php{" "}
              {accommodation.price} x {numberOfDays} days = Php{" "}
              {accommodation.price * numberOfDays}
            </p>
          ) : (
            <p className="text-gray-500">
              Select valid dates to calculate price.
            </p>
          )}

          {/* Entrance Fee Breakdown */}
          {totalEntranceFee > 0 ? (
            <>
              <p className="mt-3">
                <span className="text-gray-500">Entrance Fee (Adults):</span>{" "}
                Php {adultEntranceFee} x {adults} = Php{" "}
                {adults * adultEntranceFee}
              </p>
              <p>
                <span className="text-gray-500">Entrance Fee (Children):</span>{" "}
                Php {childEntranceFee} x {children} = Php{" "}
                {children * childEntranceFee}
              </p>
              <p className="font-bold mt-3">
                Total Entrance Fee: Php {totalEntranceFee}
              </p>
            </>
          ) : (
            <p className="text-gray-500 mt-3">No entrance fee applicable.</p>
          )}

          {/* Final Total Price */}
          {numberOfDays > 0 && (
            <div className="mt-5 font-bold bg-green-200 py-2 px-4 rounded">
              Total Price: Php{" "}
              {numberOfDays * (accommodation?.price || 0) + totalEntranceFee}
            </div>
          )}
        </div>
      </div>

      <div className="button-next w-[340px] sm:w-[1000px] flex justify-end gap-5">
        <Button
          onClickFunction={handleAddToCart}
          buttonName={"Add to Cart"}
          buttonColor={"bg-blue-400"}
          buttonHoverColor={"hover:bg-blue-300"}
        />
        <Button
          onClickFunction={() => {
            navigate("/checkout");
          }}
          buttonName={"Proceed to Checkout"}
          buttonColor={"bg-yellow-400"}
          buttonHoverColor={"hover:bg-yellow-300"}
        />
      </div>
    </div>
  );
};

export default SingleAccommodation;
