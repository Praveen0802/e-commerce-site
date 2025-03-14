import { useEffect, useState } from "react";
import { fetchCartItems } from "../utils/makeRequest";
import { getCookie, setCookie } from "../utils/helpers";
import { Link } from "react-router-dom";

import EmptyCart from "../components/emptyCart";
import { setCartValues } from "../utils/redux/cartCount/action";
import { useDispatch } from "react-redux";
import Spinner from "../components/spinner";
import CartView from "../components/CartView";
import SuccessPopup from "../components/successPopup";
import CustomModal from "../components/customModal";
import { useRazorpay } from "../utils/customHooks/useRazorpay";

const Cart = () => {
  const [loader, setLoader] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const dispatch = useDispatch();

  const { handlePayment } = useRazorpay();

  const commondispatch = (cartValues) => {
    dispatch(setCartValues(cartValues));
  };

  const getCartItems = async (cartValues) => {
    try {
      const productIds = Object.keys(cartValues);
      const selectedCartValues = [];

      for (const id of productIds) {
        const response = await fetchCartItems(id);
        const product = await response;
        selectedCartValues.push({
          ...product,
          quantity: cartValues[id],
        });
      }
      commondispatch(cartValues);
      setCartItems(selectedCartValues);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const cartValues = JSON.parse(getCookie("cart") || "{}");
    getCartItems(cartValues);
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const discountedPrice = item.price;
        return total + discountedPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const removeItem = (id) => {
    const cartValues = JSON.parse(getCookie("cart") || "{}");
    delete cartValues[id];
    setCookie("cart", JSON.stringify(cartValues));
    commondispatch(cartValues);
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const cartValues = JSON.parse(getCookie("cart") || "{}");
    cartValues[id] = newQuantity;
    setCookie("cart", JSON.stringify(cartValues));
    commondispatch(cartValues);
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity < item.stock) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleCheckout = () => {
    handlePayment({
      amount: calculateTotal(),
      notes: {
        transaction_id: "txn_" + Date.now(),
        items: cartItems.map((item) => item.id).join(","),
        total_items: cartItems.length,
      },
      onSuccess: (response) => {
        setTransactionId(response.razorpay_payment_id);
        setShowSuccessPopup(true);
        setCookie("cart", "{}");
        commondispatch({});
        setCartItems([]);
      },
      onError: (error) => {
        alert("Payment failed: " + error.description);
      },
    });
  };

  if (loader) {
    return <Spinner />;
  }

  if (cartItems.length === 0 && !showSuccessPopup) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showSuccessPopup && (
        <CustomModal
          show={showSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          outSideClickClose={false}
        >
          <SuccessPopup transactionId={transactionId} />
        </CustomModal>
      )}

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <CartView
          cartItems={cartItems}
          removeItem={removeItem}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Total:</div>
            <div className="text-xl font-bold">₹{calculateTotal()}</div>
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
          <Link
            to="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-center sm:text-left"
          >
            Continue Shopping
          </Link>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            onClick={handleCheckout}
          >
            {"Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
