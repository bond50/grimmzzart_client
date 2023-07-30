import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import {Rating} from 'react-simple-star-rating'
import RatingModal from "../../modal/RatingModal";
import Button from "../../../ui/Button/Button";
import {MDBTextArea} from "mdb-react-ui-kit";
import {getCartFromLocalStorage} from "../../../common/cart/getCartFromLocalStorage";
import DOMPurify from 'dompurify';
import classes from './SingleProduct.module.css';
import {showAverageRating} from "../../../common/rating/rating";
import {Link} from "react-router-dom";

const SingleProduct = ({
                           product,
                           rating,
                           onstarClick,
                           handleClickAddToCart,
                           handleAddToWishList,
                           show,
                           user,
                           handleQuantityIncrease,
                           handleQuantityDecrease,
                           handleInputChange,
                           value,
                           handleStarSubmit,
                           handleShow,
                           handleClose
                       }) => {

    const {description, images, slug, price, displayTitle, category, brand, color, specifications, quantity} = product;


    const cleanDescription = DOMPurify.sanitize(description);



    return (
        <>
            <section className={`section-bg-2`}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10'>
                            <div className={'card'}>
                                <div className="card-body">
                                    <div className={'row'}>
                                        <div className={'col-lg-4'}>
                                            <div className={classes.ProductImageWrapper}>
                                                <Carousel autoPlay showArrows={false} showIndicators={false}
                                                          showStatus={false}
                                                          infiniteLoop className={classes.Carousel}>
                                                    {images && images.map(image => {
                                                        return <div key={image.public_id}>
                                                            <img src={image.url} alt={displayTitle}
                                                                 className={classes.ProductImage}/>
                                                        </div>
                                                    })}
                                                </Carousel>
                                            </div>
                                        </div>
                                        <div className={'col-lg-8'}>
                                            <h3 className={classes.ProductTitle}>{displayTitle}</h3>
                                            <p className={classes.BrandInfo}>Brand:<Link
                                                to={`/brands/${brand.slug}`}>{brand.name}</Link> | <Link
                                                to={`/brands/${brand.slug}`}>
                                                Similar products
                                                from {brand.name}
                                            </Link>
                                            </p>

                                            <hr/>
                                            <p className={classes.StockInfo}>{quantity > 0 ? 'In stock' : 'Out of stock'}</p>

                                            <p className={classes.DeliveryInfo}>
                                                + delivery from KSh 92 (free delivery if order above KSh 1,999) to CBD -
                                                UON/Globe/Koja/River Road
                                            </p>

                                            <p className={classes.Price}>Ksh {product.price}</p>
                                            <div className={classes.Review}>
                                                {showAverageRating(product)}
                                                <div
                                                    className={classes.ReviewCount}>{`${product.rating.length} ${product.rating.length === 1 ? '(review)' : '(reviews)'}`}</div>
                                            </div>

                                            <Button
                                                icon={'ant-design:heart-outlined'}
                                                className={classes.AddToCart}
                                                clicked={handleClickAddToCart}>
                                                Add to Cart
                                            </Button>

                                            <div className={classes.ButtonGroup}>
                                                <Button
                                                    icon={'ant-design:heart-outlined'}
                                                    className={classes.AddToWish}
                                                    clicked={handleAddToWishList}>
                                                    Add to wishlist
                                                </Button>
                                                <RatingModal
                                                    handleStarSubmit={handleStarSubmit}
                                                    user={user}
                                                    modalTitle={`Rate ${displayTitle}`}
                                                    handleShow={handleShow}
                                                    show={show}
                                                    handleClose={handleClose}>
                                                    <Rating
                                                        initialValue={rating}
                                                        showTooltip
                                                        allowHover={false}
                                                        tooltipArray={[
                                                            'Terrible',
                                                            'Bad',
                                                            'Average',
                                                            'Great',
                                                            'Prefect'
                                                        ]}
                                                        transition
                                                        fillColorArray={[
                                                            '#f14f45',
                                                            '#f16c45',
                                                            '#f18845',
                                                            '#f1b345',
                                                            '#f1d045'
                                                        ]}
                                                        onClick={onstarClick}
                                                    />
                                                    <div className={classes.TextArea}>
                                                        <MDBTextArea
                                                            label='Comments'
                                                            value={value}
                                                            id='comments'
                                                            rows={4} onChange={handleInputChange}/>
                                                    </div>
                                                </RatingModal>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'col-lg-2'}>
                            <div className={classes.Card}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium adipisci,
                                asperiores
                                autem consectetur consequuntur delectus dicta dignissimos eligendi expedita, fugiat iste
                                laboriosam maxime possimus quibusdam sequi similique tempora unde!
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className={`section-bg-2`}>
                <div className="container">
                    <div className={'card'}>
                        <div className="card-body">
                            <div dangerouslySetInnerHTML={{__html: cleanDescription}}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`section-bg-2`}>
                <div className="container">
                    <div className={'card'}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className={classes.Card}>
                                        <h6>Specifications</h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={classes.Card}>
                                        <h6>In the box</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleProduct;
