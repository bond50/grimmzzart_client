import React from 'react';
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import SubsList from "../components/subs/SubsList";
import Featured from "../components/home/Featured";
import Hero2 from "../components/home/Hero2";
import Recent from "../components/Recent/Recent";



const Home = () => {
    return (
        <>

            {/*<Hero2/>*/}
            <SubsList/>
            <Recent/>
            <NewArrivals/>
            <Featured/>
            <BestSellers/>

        </>
    );
};

export default Home;