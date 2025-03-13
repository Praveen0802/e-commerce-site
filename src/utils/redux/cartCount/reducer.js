const { CART_VALUES } = require("./types");

const initialValue = {
  cart: {},
};

const cartReducer = (state = initialValue, action) => {
  switch (action.type) {
    case CART_VALUES:
      return {
        ...state,
        cart: { ...action?.data },
      };
    default:
      return state;
  }
};

export default cartReducer;
