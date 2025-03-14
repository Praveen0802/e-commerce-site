import { useEffect, useState } from "react";

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    const handleScriptLoad = () => {
      setIsLoaded(true);
    };

    script.addEventListener("load", handleScriptLoad);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleScriptLoad);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = ({
    amount,
    currency = "INR",
    name = "My Cart",
    description = "Cart Payment",
    image = "https://your-logo-url.com/logo.png",
    notes = {},
    prefill = {},
    theme = { color: "#3399cc" },
    onSuccess,
    onError,
    onClose,
  }) => {
    if (!isLoaded || typeof window.Razorpay === "undefined") {
      console.error("Razorpay SDK not loaded!");
      if (onError) onError(new Error("Razorpay SDK not loaded"));
      return;
    }

    try {
      const paymentOptions = {
        key: "rzp_test_VliP97Q1oGSeTa",
        amount: parseFloat(amount) * 100,
        currency,
        name,
        description,
        image,
        notes,
        theme,
        handler: function (response) {
          if (onSuccess) {
            onSuccess(response);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
            if (onClose) onClose();
          },
        },
        prefill,
      };

      const paymentObject = new window.Razorpay(paymentOptions);

      paymentObject.on("payment.failed", function (response) {
        console.error("Payment failed", response.error);
        if (onError) onError(response.error);
      });

      paymentObject.open();
    } catch (error) {
      console.error("Error initializing Razorpay", error);
      if (onError) onError(error);
    }
  };

  return {
    handlePayment,
  };
};
