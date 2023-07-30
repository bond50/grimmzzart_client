import React, {Fragment} from 'react';
import classes from './HeroSection.module.css'
import {getFeaturedProducts} from "../../services/product.service";
import Slider from 'react-slick';
import defaultImage from "../../images/default.jpg";
import {Link, useNavigate} from 'react-router-dom'
import {Icon} from '@iconify/react';
import {useDispatch} from "react-redux";
import useSWR from "swr";
import {API_URL} from "../../common/config/config";
import {fetcher} from "../../common/fetcher";
import {handleCart} from "../../common/cart/cartUtils";


const Hero = () => {
    const {data: featuredProducts, error: productsErr} = useSWR(
        `${API_URL}/featured/products`,
        fetcher
    );


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickAddToCart = (product) => {
        handleCart(product, dispatch, navigate);
    };


    if (productsErr) return <div>Failed to load featured products.</div>;
    if (!featuredProducts) return <div>Loading...</div>;
    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
    };


    return (
        <section className={`${classes.Wrapper}`}>
            <Slider {...settings}>
                {featuredProducts && featuredProducts.map((p, i) => {
                    return <Fragment key={i}>
                        <div
                            className={`${classes.Hero} d-flex align-items-center `}
                            style={{backgroundImage: `url(${p.images && p.images.length ? p.images[0].url : defaultImage})`}}
                        >

                            <div className={`${classes.Container} container `}>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <h2 className={classes.Heading}>{p.title}</h2>
                                        <blockquote className={classes.BlockQuote}>
                                            <p>{p.description.substring(0, 160) + '...'}</p>
                                        </blockquote>

                                        <div className="d-flex">
                                            <button className={classes.Btn1} onClick={() => handleClickAddToCart(p)}>Add
                                                to cart
                                            </button>
                                            <Link to={'/'}
                                                  className={`${classes.Btn2} d-flex align-items-center`}>
                                                <Icon icon="mdi:eye-outline" className={classes.Icon}/>
                                                <span>View</span></Link>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </Fragment>
                })}
            </Slider>


        </section>
    );
};

export default Hero;
