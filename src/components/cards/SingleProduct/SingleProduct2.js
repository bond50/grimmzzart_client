import React from 'react';
import './Single.css'
import {Carousel} from "react-responsive-carousel";
import defaultImage from "../../../images/default.jpg";

const SingleProduct2 = ({
                            product,
                            rating,
                            onstarClick,
                            onPointerMove,
                            show,
                            user,
                            handleStarSubmit,
                            handleShow,
                            handleClose
                        }) => {
    const {title, description, _id, images} = product
    return (
        <div className="card">
                    <div className="slider-container">
                        {images && images.length ?
                            <Carousel showArrows autoPlay infiniteLoop className="carousel-style">
                                {images && images.map(image => {
                                    return <div className="slider-item-div" key={image.public_id}>
                                        <img src={image.url} alt={title} className='img-fluid'/>
                                    </div>
                                })}
                            </Carousel> :

                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src={defaultImage}
                                     className="img-fluid"
                                     alt={title}/>

                            </div>
                        }
                    </div>

                    {/*<ul className="nav nav-tabs">*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link active" aria-current="page" href="#">{description && description}</a>*/}
                    {/*    </li>*/}

                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link disabled">Disabled</a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>
    );
};

export default SingleProduct2;