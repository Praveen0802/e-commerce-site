import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../utils/makeRequest";
import ProductList from "../components/productList";
import { useDispatch, useSelector } from "react-redux";
import { setCartValues } from "../utils/redux/cartCount/action";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";
import { getCookie, setCookie, sortByValues } from "../utils/helpers";
import CustomSelect from "../components/customSelect";
import CustomSearch from "../components/customSearch";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [selectedSort, setSelectedSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [filtersApplied, setFiltersApplied] = useState({
    limit: 10,
    skip: 0,
    sortBy: "",
    order: "",
  });
  console.log(getCookie("cart"), "ppppp");
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const updateStates = (response, params) => {
    setProducts(response?.products || []);
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.floor((params?.skip || 0) / 10) + 1,
      totalItems: response?.total || 0,
    }));
  };

  const fetchProducts = async (params) => {
    setIsLoading(true);
    try {
      const response = await getProducts(params);
      updateStates(response, params);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchKeys = async (filter) => {
    setIsLoading(true);
    try {
      const response = await searchProducts(filter);
      updateStates(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dispatchValues = (updatedCart) => {
    dispatch(setCartValues(updatedCart));
    setCookie("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    fetchProducts(filtersApplied);

    const cartValues = getCookie("cart");
    if (cartValues) {
      dispatchValues(JSON.parse(cartValues));
    }
  }, []);

  const handlePageChange = (pageNumber) => {
    const skip = (pageNumber - 1) * 10;
    const updatedFilter = { ...filtersApplied, skip };

    fetchProducts(updatedFilter);
    setFiltersApplied(updatedFilter);
    window.scrollTo(0, 0);
  };

  const addToCart = (product) => {
    const { id } = product;
    const updatedAddCart = { ...cart, [id]: (cart[id] || 0) + 1 };
    dispatchValues(updatedAddCart);
  };

  const removeFromCart = (product) => {
    const { id } = product;
    const updatedRemovedCart = {
      ...cart,
      [id]: Math.max((cart[id] || 0) - 1, 0),
    };
    dispatchValues(updatedRemovedCart);
  };

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  const handleSortChange = (option) => {
    setSelectedSort(option);

    const updatedFilter = {
      ...filtersApplied,
      skip: 0,
      q: searchQuery,
      ...sortByValues(option?.value),
    };

    fetchProducts(updatedFilter);
    setFiltersApplied(updatedFilter);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const updatedFilter = {
      ...filtersApplied,
      skip: 0,
      q: query,
    };

    if (query) {
      searchKeys(updatedFilter);
    } else {
      fetchProducts(updatedFilter);
    }

    setFiltersApplied(updatedFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            Our Products
          </h2>
          <div className="flex gap-4 items-center w-full md:w-auto">
            <CustomSearch onSearch={handleSearch} />
            <CustomSelect
              options={sortOptions}
              defaultValue={sortOptions[0]}
              onChange={handleSortChange}
              className={"w-full"}
            />
          </div>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductList
                key={product.id}
                product={product}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}

        {!isLoading && products.length > 0 && pagination.totalItems > 10 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalItems={pagination.totalItems}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;
