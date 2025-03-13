export const setCookie = (name, value, days = 7) => {
  let expires = "";

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}${expires};`;
};

export const getCookie = (name) => {
  const cookies = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  return cookies ? decodeURIComponent(cookies.split("=")[1]) : null;
};

export const sortByValues = (value) => {
  if (value === "price-asc") {
    return { sortBy: "price", order: "asc" };
  } else if (value === "price-desc") {
    return { sortBy: "price", order: "desc" };
  } else {
    return { sortBy: "", order: "" };
  }
};
