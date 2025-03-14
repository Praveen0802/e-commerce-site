import axios from "axios";

const makeRequest = async ({
  url,
  method = "GET",
  headers = {},
  params = null,
}) => {
  let modifiedUrl = url;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    modifiedUrl += modifiedUrl.includes("?")
      ? `&${queryString}`
      : `?${queryString}`;
  }

  try {
    let requestConfig = {
      method: method.toUpperCase(),
      url: modifiedUrl,
      headers,
    };

    const response = await axios(requestConfig);
    return response;
  } catch (error) {
    console.error(
      `${error?.response?.status || "Unknown"} error in API: ${url}`,
      error
    );
    throw error;
  }
};

export const getProducts = async (params) => {
  try {
    const response = await makeRequest({
      url: `https://dummyjson.com/products`,
      method: "GET",
      params: params,
    });

    return response?.data;
  } catch (error) {
    return error;
  }
};

export const searchProducts = async (searchQuery) => {
  try {
    const response = await makeRequest({
      url: `https://dummyjson.com/products/search`,
      method: "GET",
      params: searchQuery,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const fetchCartItems = async (id, params) => {
  try {
    const response = await makeRequest({
      url: `https://dummyjson.com/products/${id}`,
      method: "GET",
      ...(params && { params }),
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
