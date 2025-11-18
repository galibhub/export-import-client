import React from 'react';
import { useLoaderData } from 'react-router';

import LatestProduct from '../ProductCard/LatestProduct';
import Banner from './Banner';

const Home = () => {
    const data=useLoaderData();
    console.log(data)

    return (
        <div>
            <Banner></Banner>
            <div className="text-2xl text-primary text-center font-bold mt-2">Latest Products</div>
            <p className="text-center text-gray-600 mb-8 text-sm md:text-base">Discover the most recently added Products</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {
                    data.map(product=><LatestProduct key={product._id} product={product}></LatestProduct>)
                }
            </div>
        </div>
    );
};

export default Home;