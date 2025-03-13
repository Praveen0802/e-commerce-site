import { CART_VALUES } from "./types";

export const setCartValues = (data) => ({
  type: CART_VALUES,
  data: data,
});
