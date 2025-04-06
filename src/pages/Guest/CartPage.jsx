import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const handleDeleteItem = async (cartItemId) => {
    if (!cartItemId) {
      toast.error("Invalid item ID.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/lafreza-server/guest/delete_from_cart.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart_id: cartItemId }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cart_id !== cartItemId)
        );
        toast.success("Item deleted from cart.");
      } else {
        toast.error(result.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const downpayment = totalPrice / 2;

  return (
    <div className="w-full min-h-screen pt-24 pb-24 guest-form-bg px-8 sm:px-44">
      <div className="flex flex-col w-full sm:flex-row gap-5">
        <div className="main sm:w-3/5 flex flex-col gap-3">
          <div className="header shadow-lg rounded-lg p-5 sm:px-8 2xl:px-20 bg-gray-100 font-bold text-xl">
            Bookings Cart
          </div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="bookings-card shadow-lg rounded-lg p-5 sm:px-8 2xl:px-20 bg-gray-100 flex justify-between"
              >
                <div>
                  <h1 className="font-bold text-lg">
                    {item.accommodation_name}
                  </h1>
                  <p>From: {item.date_from}</p>
                  <p>To: {item.date_to}</p>
                  <p>Adults: {item.adults}</p>
                  <p>Children: {item.children}</p>
                  <p>Total Price: Php {item.total_price}</p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.cart_id)}
                  className="bg-red-400 hover:bg-red-300 rounded p-5"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <div className="bookings-card shadow-lg rounded-lg p-5 sm:px-8 2xl:px-20 bg-gray-100">
              {" "}
              <p className="text-red-500">No items in cart.</p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:w-2/5 gap-3">
          <div className="price shadow-lg rounded-lg p-5 sm:px-8 2xl:px-20 bg-gray-100 ">
            <ul>
              <li>
                <div className="flex justify-between text-gray-500">
                  <div>Total Price: </div>
                  <div>Php {totalPrice}.00</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between text-gray-500">
                  <div>50% Downpayment: </div>
                  <div>Php {downpayment}.00</div>
                </div>
              </li>
              <li className="mt-5">
                <div className="flex justify-between text-lg">
                  <div>Amount to Pay: </div>
                  <div className="text-red-500">Php {downpayment}.00</div>
                </div>
              </li>
            </ul>
          </div>
          <Button
            buttonColor={"bg-yellow-400"}
            buttonHoverColor={"hover:bg-yellow-300"}
            buttonName={"Proceed to Checkout"}
            onClickFunction={() => {
              navigate("/checkout");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
