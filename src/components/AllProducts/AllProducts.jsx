import { useLoaderData } from "react-router";
import ProductCard from "../ProductCard/ProductCard";

const AllProducts = () => {
    const data = useLoaderData();
    console.log(data);
    
    return (
        <div>
            <div className="text-2xl text-red-800 text-center font-bold mt-2">All Products</div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 ">
                 {
                    data.map(product=><ProductCard key={product._id} product={product}></ProductCard>)
                 }
            </div>
        </div>
    );
};

export default AllProducts;