import React, {useState} from 'react';
import defaultImage from '../../../images/default.jpg'
import classes from './ProductCard.module.css'
import {showAverageRating} from "../../../common/rating/rating";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../../redux/slices/cart";
import {setVisible} from "../../../redux/slices/drawer";
import {toast} from "react-toastify";
import {setTotalAfterDiscount} from "../../../redux/slices/totalAfterDiscount";
import {couponApplied} from "../../../redux/slices/coupon";

import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import {getCartFromLocalStorage} from "../../../common/cart/getCartFromLocalStorage";
import {handleCart} from "../../../common/cart/cartUtils";


const ProductCard = ({
                         product,
                         singleBtn,
                         btn1Clicked,
                         btn2Clicked,
                         btnCaption1,
                         btnCaption2,
                     }) => {


    const {description, images, slug, price, title, category, rating, quantity} = product;

    const [tooltip, seTooltip] = useState('Click to add')
    const [showTooltip, setShowTooltip] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleClickAddToCart = () => {
        handleCart(product, dispatch, navigate);
    };

    const CardImage = ({product}) => (
        <img
            className='img-fluid'
            src={product.images && product.images.length ? product.images[0].url : defaultImage}
            alt={product.title}
        />
    );

    const CardCategory = ({category}) => (
        <span className="product-catagory">{category ? category.name : 'Uncategorized'}</span>
    );

    const CardTitle = ({title}) => (
        <Link to={`/product/${slug}`}>{title}</Link>
    );
    const Rating = ({product}) => (
        <span className='product-rating'> {showAverageRating(product)}</span>
    );

    const CardDescription = ({description}) => (
        <p>{`${description && description.substring(0, 60)}...`}</p>
    );

    const CardPrice = ({price}) => (
        <div className="product-price"><small>$96.00</small>${price}</div>
    );


    const CardLinks = () => (
        <div className="product-links">
            <span onClick={handleClickAddToCart} className="icon-link">
                <Icon icon="mdi:cards-heart-outline"/>
            </span>
            <span onClick={handleCart} className="icon-link">
                <Icon icon="ic:round-add-shopping-cart"/>
            </span>
        </div>
    );


    return (

        <div className="product-card">
            <div className="badge">Hot</div>
            <div className="product-tumb">
                <Link to={`/product/${slug}`}>
                    <CardImage product={product}/>
                </Link>
            </div>
            <div className="product-details">
                <Link to={`/category/${category.slug}`}>
                    <CardCategory category={product.category}/>
                </Link>

                <div className='d-flex align-items-center justify-content-between title '>
                    <CardTitle title={product.title}/>
                    <Rating product={product}/>
                </div>
                <CardDescription description={product.description}/>


                <div className="product-bottom-details">
                    <CardPrice price={product.price}/>
                    <CardLinks/>
                </div>
            </div>
        </div>


    );
};
ProductCard.propTypes = {
    product: PropTypes.shape({
        description: PropTypes.string,
        images: PropTypes.array,
        slug: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string,
        }),
        rating: PropTypes.array,
        quantity: PropTypes.number,
    }).isRequired,
    singleBtn: PropTypes.bool,
    btn1Clicked: PropTypes.func,
    btn2Clicked: PropTypes.func,
    btnCaption1: PropTypes.string,
    btnCaption2: PropTypes.string,
};
ProductCard.defaultProps = {
    singleBtn: false,
    btn1Clicked: () => {
    },
    btn2Clicked: () => {
    },
    btnCaption1: '',
    btnCaption2: '',
};

export default ProductCard;