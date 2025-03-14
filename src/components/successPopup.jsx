import React from "react";
import { Link } from "react-router-dom";

const SuccessPopup = ({ transactionId }) => {
  return (
    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
      <div className="flex flex-col items-center">
        <div className="mb-4 rounded-full bg-green-100 p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Your order has been successfully placed.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg w-full mb-6">
          <p className="text-gray-700 font-medium">Transaction ID:</p>
          <p className="text-gray-900 font-bold break-all">{transactionId}</p>
        </div>
        <div className="flex justify-center w-full">
          <Link
            to="/"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
