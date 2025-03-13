import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FlipkartHeader = () => {
  const { cart } = useSelector((state) => state.cart);
  const cartItemsCount = Object.values(cart).reduce(
    (total, qty) => total + qty,
    0
  );

  return (
    <header className="bg-white shadow-sm border-b w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-[#022b50] italic">
                My Cart
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-[#022b50]" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#022b50] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount > 99 ? "99+" : cartItemsCount}
                  </span>
                )}
              </div>
              <span className="ml-1 text-sm font-medium hidden sm:block">
                Cart
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FlipkartHeader;
