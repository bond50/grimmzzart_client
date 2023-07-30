import React from 'react';
import Slider from 'react-slick';
import classes from './Top.module.css';

const Top = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    className: 'slider',
  };

  const slidesData = [
    { text: 'Get 20% off on all electronics! Limited time offer.' },
    { text: 'Sign up now and receive a $10 coupon for your first purchase!' },
    { text: 'Discover the latest gadgets and accessories for your tech needs.' },
    { text: 'Shop for high-quality electronics with fast and secure delivery.' },
    { text: 'Join our community and stay updated with the latest tech trends.' },
  ];

  return (
    <section className={classes.TopBar}>
      <div className="container">
        <Slider {...settings}>
          {slidesData.map((slide, index) => (
            <div key={index} className={`${classes.Slide} d-flex justify-content-between align-items-center`}>
              <div className="text-banner">
                <p>{slide.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Top;
