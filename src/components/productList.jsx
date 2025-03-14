const ProductList = (props) => {
  const { product, addToCart, removeFromCart, cart } = props;
  return (
    <div
      key={product?.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden bg-gray-100">
        {product?.images && product?.images[0] ? (
          <img
            src={product?.images[0]}
            alt={product?.title}
            loading="lazy"
            className=" h-full mx-auto aspect-square transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {product?.stock <= 5 && product?.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">
            Low Stock
          </div>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <div className="mb-2">
          <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded-full text-gray-600">
            {product?.category}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {product?.title}
        </h2>

        <div className="mb-4">
          <p className="text-gray-900 font-bold text-lg">
            ₹{product?.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {product?.stock > 10
              ? "In Stock"
              : product?.stock > 0
              ? `Only ${product?.stock} left`
              : "Out of Stock"}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          {!cart[product?.id] ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product?.stock <= 0}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => removeFromCart(product)}
                className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="text-center px-4 font-medium">
                {cart[product?.id]}
              </span>
              <button
                onClick={() => addToCart(product)}
                className={`w-10 h-10 bg-blue-600 text-white flex items-center justify-center disabled:bg-gray-400 hover:bg-blue-700 transition-colors focus:outline-none`}
                disabled={product?.stock <= cart[product?.id]}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
