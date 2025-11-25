import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

const AllProducts = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(false);
  // console.log(data);

   useEffect(() => {
      document.title = "All Products";
    }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    console.log(search_text);
    setLoading(true);

    fetch(`https://export-server-alpha.vercel.app/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }


  
  return (
    <div>
      <div className="text-2xl text-blue-800 text-center font-bold mt-4 ">
        All Products
      </div>

      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center mt-3 mb-4"
      >
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn btn-primary mr-1">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
        {products.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
