import React, { useEffect } from "react";
import { useLoaderData } from "react-router";

import LatestProduct from "../ProductCard/LatestProduct";
import Banner from "./Banner";
import TopCategories from "./TopCategories";
import FeaturedExport from "./FeaturesExport";
import WhyChooseUs from "./WhyChooseUs";
import HomeStats from "./HomeStats";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import HomeCTA from "./HomeCTA";

const Home = () => {
  const data = useLoaderData();

  // console.log(data)
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      <Banner></Banner>
      <HomeStats></HomeStats>
      <div className="text-center max-w-3xl mx-auto mb-12 mt-20 relative">
        {/* Decorative Blur Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>

        {/* Eyebrow Label */}
        <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-3 block animate-pulse">
          Fresh Arrivals
        </span>

        {/* Main Gradient Heading */}
        <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          Our Latest{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Products
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base-content/70 text-lg md:text-xl font-medium max-w-xl mx-auto">
          Discover the most recently added items from top global exporters.
        </p>

        {/* Decorative Line */}
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
      </div>
     <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {data.map((product) => (
          <LatestProduct key={product._id} product={product}></LatestProduct>
        ))}
      </div>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
      <TopCategories></TopCategories>
      <Testimonials></Testimonials>
      <FeaturedExport></FeaturedExport>
      <HomeCTA></HomeCTA>
    </div>
  );
};

export default Home;
