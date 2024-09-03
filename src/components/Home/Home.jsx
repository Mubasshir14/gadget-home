import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import NewArrival from '../NewArrival/NewArrival';
import FlashDeal from '../FlashDeal/FlashDeal';
import Ads from '../Ads/Ads';
import Exclusive from '../Exclusive/Exclusive';
import { Helmet } from 'react-helmet';
import TopSold from '../TopSold/TopSold';
import Adst from '../Adst/Adst';
import Testimonial from '../Testimonial/Testimonial';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Gadget Home</title>
            </Helmet>

            <Banner />
            <Category />
            <FlashDeal />
            <NewArrival />
            <Ads />
            <Exclusive />
            <TopSold/>
            <Adst/>
            <Testimonial/>
        </div>
    );
};

export default Home;