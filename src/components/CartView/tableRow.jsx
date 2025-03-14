const TableRow = (props) => {
  const {
    item,
    discountedPrice,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    isMaxQuantity,
  } = props;
  return (
    <tr key={item?.id} className="border-b-[1px] border-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 rounded-md object-cover"
              src={item?.thumbnail}
              alt={item?.title}
            />
          </div>
          <div className="">
            <div className="text-sm font-medium text-gray-900">
              {item?.title}
            </div>
            <div className="text-sm text-gray-500">{item?.brand}</div>
            <div className="text-xs text-gray-400">
              {item?.stock > 0 ? `In stock: ${item?.stock}` : "Out of stock"}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">₹{discountedPrice}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => decreaseQuantity(item?.id)}
            className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center focus:outline-none"
            disabled={item?.quantity <= 1}
          >
            -
          </button>
          <span className="text-gray-700 w-8 text-center">
            {item?.quantity}
          </span>
          <button
            onClick={() => increaseQuantity(item?.id)}
            className={`rounded-full w-6 h-6 flex items-center justify-center focus:outline-none ${
                isMaxQuantity
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
              }`}
            disabled={isMaxQuantity}
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ₹{(discountedPrice * item?.quantity).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => removeItem(item?.id)}
          className="text-red-600 hover:text-red-900"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
