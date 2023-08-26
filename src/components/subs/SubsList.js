import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {getSubsWithProducts} from '../../services/sub.service';
import Container from '../Container/Container';
import './SubsList.css';
import {Link} from 'react-router-dom';
import Loader from '../../common/Loader/Loader';

const SubsList = () => {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubsWithProducts()
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
        slidesToShow: Math.min(subs.length, 6), // Show up to 6 slides initially
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(subs.length, 4), // Show up to 4 slides on smaller screens
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(subs.length, 3), // Show up to 3 slides on even smaller screens
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(subs.length, 1), // Show 1 slide on the smallest screens
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const getRandomImage = (images) => {
        if (images && images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex].url;
        } else {
            return '/images/camera.jpg';
        }
    };

    return loading ? (
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
                                <Link to={`/subs/${sub.slug}`}>{sub.name}</Link>
                            </h6>
                        </div>
                    );
                })}
            </Slider>
        </Container>
    );
};

export default SubsList;
