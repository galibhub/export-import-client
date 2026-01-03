import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router';

import LatestProduct from '../ProductCard/LatestProduct';
import Banner from './Banner';
import TopCategories from './TopCategories';
import FeaturedExport from './FeaturesExport';

const Home = () => {
    const data=useLoaderData();
  
    // console.log(data)
     useEffect(() => {
    document.title = "Home";
  }, []);


    return (
        <div>
            <Banner></Banner>
            <div className="text-3xl md:text-4xl font-bold text-center text-primary mt-10">Our Latest Products</div>
            <p className="text-center text-gray-600 mb-8 text-lg md:text-base">Discover the most recently added Products</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                {
                    data.map(product=><LatestProduct key={product._id} product={product}></LatestProduct>)
                }
            </div>
            <TopCategories></TopCategories>
            <FeaturedExport></FeaturedExport>
        </div>
    );
};

export default Home;