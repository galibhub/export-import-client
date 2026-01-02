import { useEffect, useState, useMemo, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

const AllProducts = () => {
  const initialData = useLoaderData();
  const searchRef = useRef(null); // Reference to clear input field later

  const [products, setProducts] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    document.title = "All Products";
  }, []);

  // ✅ 1. Stable Categories
  // Derived from initialData so the dropdown doesn't shrink when you search
  const categories = useMemo(() => {
    const allCategories = initialData
      .map((p) => p.category)
      .filter(Boolean);
    return ["all", ...new Set(allCategories)];
  }, [initialData]);

  // ✅ 2. Filtering Logic (Derived State)
  const filteredProducts = useMemo(() => {
    let temp = [...products];

    // Category Filter
    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }

    // Price Filter
    if (priceRange !== "all") {
      if (priceRange === "low") temp = temp.filter((p) => p.price < 50);
      if (priceRange === "mid") temp = temp.filter((p) => p.price >= 50 && p.price <= 200);
      if (priceRange === "high") temp = temp.filter((p) => p.price > 200);
    }

    return temp;
  }, [products, category, priceRange]);

  // 🔎 Search Handler
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchText = searchRef.current.value.trim();
    
    if (!searchText) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/search?search=${searchText}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Reset Handler
  const handleReset = () => {
    setProducts(initialData); // Restore original data
    setCategory("all");
    setPriceRange("all");
    if (searchRef.current) searchRef.current.value = ""; // Clear the input visually
  };

  // ⏳ Loading State (Spinner)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-base-content">
        All Products
      </h1>

      {/* -------------------- Filters & Search -------------------- */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row gap-4 justify-center mb-8"
      >
        {/* Input with Ref */}
        <input
          ref={searchRef}
          name="search"
          type="search"
          placeholder="Search products..."
          className="input input-bordered w-full lg:w-1/3"
        />

        <select
          className="select select-bordered w-full lg:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full lg:w-1/4"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="low">Below $50</option>
          <option value="mid">$50 – $200</option>
          <option value="high">Above $200</option>
        </select>

        <button type="submit" className="btn btn-primary">
          Search
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-outline"
        >
          Reset
        </button>
      </form>

      {/* -------------------- Product Grid -------------------- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-base-content/60 mt-12">
          <h3 className="text-xl mb-3">No products found</h3>
          <button onClick={handleReset} className="btn btn-link">
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default AllProducts;