import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <p className="text-gray-500">Your cart is empty</p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
export default EmptyCart;