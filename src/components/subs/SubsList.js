import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {getSubs} from '../../services/sub.service';
import Container from '../Container/Container';
import './SubsList.css';
import {Link} from "react-router-dom";
import Loader from "../../common/Loader/Loader";

const SubsList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs()
            .then((response) => {
                setSubs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                    initialSlide: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const getRandomImage = (images) => {
        if (images && images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex].url;
        } else {
            return '/images/camera.jpg';
        }
    }


    return (
        loading ? (
            <Loader/>
        ) : (
            <Container class1="home-wrapper-2 py-5">
                <Slider {...settings}>
                    {subs.map((sub, index) => {
                        return (
                            <div key={index} className="categories">
                                <Link to={`/subs/${sub.slug}`}>
                                    <img src={getRandomImage(sub.images)} alt={sub.name}/>
                                </Link>
                                <h6>
                                    <Link to={`/subs/${sub.slug}`}>
                                        {sub.name}
                                    </Link>
                                </h6>

                            </div>

                        )
                            ;
                    })}
                </Slider>
            </Container>
        )
    );
};

export default SubsList;