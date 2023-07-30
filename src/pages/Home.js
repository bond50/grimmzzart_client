import React from 'react';
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/home/category/CategoryList";
import SubsList from "../components/subs/SubsList";
import Hero from "../components/home/Hero";
import Featured from "../components/home/Featured";
import Hero2 from "../components/home/Hero2";
import Recent from "../components/Recent/Recent";


const Home = () => {
    return (
        <>
            {/*<Hero/>*/}
            <Hero2/>
            <SubsList/>
            <Recent/>
            <NewArrivals/>
            <Featured/>
            <BestSellers/>

        </>
    );
};

export default Home;