import React from 'react';
import {Link} from "react-router-dom";
import Container from "../Container/Container";
import {Carousel} from "react-responsive-carousel";
import './Card2.css'

const mainBanners = [
    {
        src: '/images/main-banner-1.jpg',
        title: 'SUPERCHARGED FOR PROS.',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    }
    , {
        src: '/images/catbanner-02.jpg',
        title: 'SUPERCHARGED FOR PROS.',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    }, {

        src: '/images/catbanner-01.jpg',
        title: 'SUPERCHARGED FOR PROS.',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    },

];

const smallBanners = [
    {
        src: '/images/catbanner-01.jpg',
        title: 'Best Sake',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    }
    , {
        src: '/images/catbanner-02.jpg',
        title: 'Best Sake',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    }
    , {
        src: '/images/catbanner-03.jpg',
        title: 'Best Sake',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    },
    {
        src: '/images/catbanner-01.jpg',
        title: 'Best Sake',
        subtitle: 'iPad S13+ Pro.',
        price: 'From Ksh 999.00'
    },

];

const Hero2 = () => {
    return (
        <Container class1="home-wrapper-1 py-5">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <Carousel autoPlay showArrows={false} showThumbs={false} showStatus={false} infiniteLoop>
                        {mainBanners.map((banner, index) => (
                            <div key={index} className="main-banner position-relative">
                                <img
                                    src={banner.src}
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="main-banner-content position-absolute">
                                    <h4>{banner.title}</h4>
                                    <h5>{banner.subtitle}</h5>
                                    <p>{banner.price}</p>
                                    <Link className="button">BUY NOW</Link>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                        {smallBanners.map((banner, index) => (
                            <div key={index} className="small-banner position-relative">
                                <img
                                    src={banner.src}
                                    className="img-fluid rounded-3"
                                    alt="small banner"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>{banner.title}</h4>
                                    <h5>{banner.subtitle}</h5>
                                    <p>{banner.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Hero2;
