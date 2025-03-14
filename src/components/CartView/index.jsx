import TableHeader from "./tableHeader";
import TableRow from "./tableRow";

const CartView = ({
  cartItems,
  removeItem,
  decreaseQuantity,
  increaseQuantity,
}) => {
  return (
    <div className="h-[400px] overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <TableHeader />
        </thead>
        <tbody className="bg-white border-[1px] border-gray-200">
          {cartItems.map((item) => {
            const discountedPrice = item?.price.toFixed(2);
            const isMaxQuantity = item?.quantity >= item?.stock;

            return (
              <TableRow
                item={item}
                discountedPrice={discountedPrice}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                removeItem={removeItem}
                isMaxQuantity={isMaxQuantity}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartView;
