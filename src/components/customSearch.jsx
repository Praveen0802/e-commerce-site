import { useState, useEffect } from "react";

const CustomSearch = ({ onSearch, delay = 500 }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchQuery = query.trim();
      onSearch(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
      />
    </div>
  );
};

export default CustomSearch;
