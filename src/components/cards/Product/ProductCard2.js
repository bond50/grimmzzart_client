import React from 'react';
import defaultImage from '../../../images/default.jpg'
import {Link, useNavigate} from "react-router-dom";
import classes from './ProductCard2.module.css'
import {showAverageRating} from "../../../common/rating/rating";
import {useDispatch} from "react-redux";
import {useEffect, useRef} from 'react';

import {handleCart} from "../../../common/cart/cartUtils";


const ProductCard2 = ({product, hideQty, hideCat, hideDesc, hideRating}) => {
    const {description, images, slug, price, title, displayTitle, category, color, specifications, quantity} = product;


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClickAddToCart = () => {
        handleCart(product, dispatch, navigate);
    };

    return (
        <>
            <div className={classes.ProductCard}>
                {/*<div className={classes.WishlistIcon}>*/}
                {/*    <button*/}
                {/*        data-tooltip-id={id}*/}
                {/*        data-tooltip-content="Add to wishlist"*/}
                {/*        data-tooltip-place="left"*/}
                {/*        className="border-0 bg-transparent">*/}
                {/*        <Icon icon='mdi:cards-heart' width="18" height="18" className={classes.Icon}/>*/}
                {/*    </button>*/}
                {/*</div>*/}
                <Link to={`/product/${slug}`}>
                    <div className={classes.ProductImage}>
                        <div className={classes.Image}>
                            <img
                                src={images && images.length ? images[0].url : defaultImage} className="img-fluid"
                                alt="product image"/>
                            <img
                                src={images?.length > 0 ? images[1]?.url : defaultImage} className="img-fluid"
                                alt="product image"/>
                        </div>
                    </div>
                    <div className={classes.ProductDetails}>
                        {
                            !hideQty && <p className={quantity < 1 ? `${classes.Less}` : ''}>
                                {quantity === 1 ? '1 product remaining' : `${quantity} products remaining`}
                            </p>
                        }

                        {!hideCat && <h6 className={classes.Brand}>{category ? category.name : 'Uncategorized'}</h6>}
                        <h5 className={classes.ProductTitle}>
                            {displayTitle && `${displayTitle.substring(0, 40)}...`}
                        </h5>
                        {!hideRating && <span>{showAverageRating(product)}</span>}
                        {!hideDesc && <p className={classes.Description}>
                            {description && `${description.substring(0, 40)}...`}
                        </p>}
                        <p className={classes.Price}>KSH {`${price}.00`}</p>
                    </div>
                </Link>
                {/*<div className={classes.ActionBar}>*/}
                {/*    <div className="d-flex flex-column gap-10">*/}
                {/*        <Link to={`/product/${slug}`}>*/}
                {/*            <button*/}
                {/*                data-tooltip-id={id}*/}
                {/*                data-tooltip-content="View product"*/}
                {/*                data-tooltip-place="left"*/}
                {/*                className="border-0 bg-transparent">*/}
                {/*                <Icon icon="ic:outline-remove-red-eye" width="16" height="16" className={classes.Icon}/>*/}
                {/*            </button>*/}
                {/*        </Link>*/}
                {/*        <button*/}
                {/*            disabled={quantity < 1}*/}
                {/*            className="border-0 bg-transparent"*/}
                {/*            onClick={handleClickAddToCart}*/}
                {/*            data-tooltip-id={id}*/}
                {/*            data-tooltip-content={quantity > 0 ? 'Add to cart' : ''}*/}
                {/*            data-tooltip-place="left">*/}
                {/*            <Icon*/}
                {/*                icon="material-symbols:add-shopping-cart"*/}
                {/*                width="16" height="16"*/}
                {/*                className={classes.Icon}/>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            {/*<Tooltip id={id}/>*/}

        </>
    );
};

export default ProductCard2;
