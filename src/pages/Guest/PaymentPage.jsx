import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";

const PaymentPage = () => {
  const [guest, setGuest] = useState([]);
  const guestId = localStorage.getItem("guest_id");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuest = async () => {
      if (!guestId) return;

      try {
        const response = await fetch(
          `http://localhost/lafreza-server/guest/fetch_guest_info.php?id=${guestId}`
        );

        const result = await response.json();

        if (result.success) {
          setGuest(result.data);
        } else {
          console.error("Failed to fetch guest info:", result.message);
        }
      } catch (error) {
        console.error("Error fetching guest info:", error);
      }
    };

    fetchGuest();
  }, [guestId]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "http://localhost/lafreza-server/guest/fetch_cart.php",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const result = await response.json();
        console.log("API Response:", result);

        if (response.ok && result.success) {
          setCartItems(result.cart_items);
          calculateTotalPrice(result.cart_items);
        } else {
          console.log("Failed to load cart items.");
        }
      } catch (error) {
        console.log("Error fetching cart items: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.total_price),
      0
    );

    setTotalPrice(total);
  };

  const downpayment = totalPrice / 2;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className=" w-full min-h-screen pt-24 pb-24 guest-form-bg flex sm:justify-center items-center flex-col">
      <div className="bg-gray-100 w-[340px] sm:w-[600px] 2xl:w-[1300px] h-full shadow-lg rounded-lg p-5 sm:px-10 sm:pt-10 2xl:px-20 mb-5 ">
        <div className="mb-7">
          <Link to="/accommodations/" className="flex items-center">
            <FaArrowLeft className="mr-2" /> Back
          </Link>
        </div>
        <div className="flex justify-around mb-5 h-full">
          <div className="guest-info ">
            <h1 className="font-bold">Guest Information</h1>
            {guest ? (
              <>
                <p className="mb-1">Name: {guest.guest_name}</p>
                <p className="mb-1">Email: {guest.guest_email}</p>
                <p className="mb-1">Phone: 0{guest.contact_number}</p>
              </>
            ) : (
              <p className="text-gray-500 italic">
                Loading guest information...
              </p>
            )}
          </div>
          <div>
            <h1 className="font-bold mb-2">Bookings</h1>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bookings-card 2xl:px-20 sm:mb-3 bg-gray-100 flex justify-between"
                >
                  <div>
                    <h1 className="font-bold">{item.accommodation_name}</h1>
                    <p>From: {item.date_from}</p>
                    <p>To: {item.date_to}</p>
                    <p>Adults: {item.adults}</p>
                    <p>Children: {item.children}</p>
                    <p>Total Price: Php {item.total_price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bookings-card shadow-lg rounded-lg p-5 sm:px-8 2xl:px-20 bg-gray-100">
                {" "}
                <p className="text-red-500">No items in cart.</p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-green-200 py-2 px-4 rounded-lg">
          <ul>
            <li>
              <div className="flex justify-between ">
                <div>Total Price: </div>
                <div>Php {totalPrice}.00</div>
              </div>
            </li>
            <li>
              <div className="flex justify-between ">
                <div>50% Downpayment: </div>
                <div>Php {downpayment}.00</div>
              </div>
            </li>
            <li className="mt-5">
              <div className="flex justify-between ">
                <div>Amount to Pay: </div>
                <div className="text-red-500">Php {downpayment}.00</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            buttonName={"Proceed to Payment"}
            buttonColor={"bg-yellow-400"}
            buttonHoverColor={"hover:bg-yellow-300"}
            buttonWidth={"w-full"}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
