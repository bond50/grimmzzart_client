import React, {useEffect, useState} from 'react';
import Slider from 'react-slick';
import {getSubs} from '../../services/sub.service';
import Container from '../Container/Container';
import './SubsList.css';
import {Last} from "react-bootstrap/PageItem";
import {Link} from "react-router-dom";

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
        slidesToShow: 8,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
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
            <Last/>
        ) : (
            <Container class1="home-wrapper-2 py-5">
                <Slider {...settings}>
                    {subs.map((sub, index) => {
                        return (
                            <div key={index} className="categories">
                                <Link to={`/subs/${sub.slug}`}>

                                    <img src={getRandomImage(sub.images)} alt={sub.name}/>
                                    <h6>{sub.name}</h6>

                                </Link>
                            </div>

                        );
                    })}
                </Slider>
            </Container>
        )
    );
};

export default SubsList;
