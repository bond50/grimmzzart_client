import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import SingleProduct from "../components/cards/SingleProduct/SingleProduct";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../common/Loader/Loader";
import {fetcher, swrOptions} from "../common/fetcher";
import useSWR from "swr";
import {API_URL} from "../common/config/config";
import {handleCart, handleQtyDecrease, handleQtyIncrease} from "../common/cart/cartUtils";
import {addToWishlist} from "../services/user.service";
import ListReview from "../components/Reviews/ListReview";
import Related from "../components/Related/Related";
import {addToRecentlyViewed} from "../redux/slices/recentlyViewed";
import Recent from "../components/Recent/Recent";
import {productStar} from "../services/product.service";
import Wrapper2 from "../hoc/Wrapper2";


const Product = () => {
    const [star, setStar] = useState(0)
    const [value, setValue] = useState('')
    const [show, setShow] = useState(false);
    const {user} = useSelector((state) => state.auth);
    let {slug} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {data: product, error: productError} = useSWR(
        `${API_URL}/product/${slug}`,
        fetcher,
        swrOptions)


    const checkExistingRating = useCallback(() => {
        if (user) {
            if (product && product.rating && product.rating.length > 0 && user) {
                let existingRatingObject = product.rating.find(ele => (ele.postedBy.toString() === user._id.toString()))

                if (existingRatingObject !== undefined) {
                    setStar(existingRatingObject.star)
                }

            }
        }

    }, [product, user])

    useEffect(() => {
        checkExistingRating();
    }, [checkExistingRating, product, user]);

    useEffect(() => {
        if (product) {
            dispatch(addToRecentlyViewed(product)); // Dispatch the addToRecentlyViewed action
        }
    }, [dispatch, product]);

    const onPointerMove = (value, index) => alert(value, index)


    if (!product) {
        return <Loader/>
    }
    if (productError) {
        return <h3>Error occurred while loading the product</h3>
    }


    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (user && user.token) {
            setShow(true)
        } else {
            navigate('/auth/login', {state: {from: `/product/${slug}`}});
        }
    }
    const handleClickAddToCart = () => {
        handleCart(product, dispatch, navigate);
    };
    const handleQuantityIncrease = () => {
        handleQtyIncrease(product, dispatch);

    };

    const handleQuantityDecrease = () => {
        handleQtyDecrease(product, dispatch);
    };


    const handleAddToWishList = (e) => {
        if (user && user.token) {
            e.preventDefault()
            addToWishlist(user.token, product._id).then(r => {
                toast.success('Added to wishlist')
            }).catch(e => {
                console.log(e)
            })
        } else {
            navigate('/auth/login', {state: {from: `/product/${slug}`}});
        }
    }

    function handleStarSubmit() {
        productStar(product._id, {star, value}, user.token).then(r => {
            toast.success(`Review posted successfully`, {position: toast.POSITION.BOTTOM_CENTER})
        }).catch(err => {
            toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_CENTER})
        })


        setShow(false)

    }

    function onStarClick(val) {
        setStar(val)
    }

    const handleInputChange = (e) => {
        setValue(e.target.value)
    }


    return (
        <Wrapper2 title={product.displayTitle}>
            {product && <SingleProduct
                product={product}
                handleClickAddToCart={handleClickAddToCart}
                handleAddToWishList={handleAddToWishList}
                rating={star}
                onstarClick={onStarClick}
                handleStarSubmit={handleStarSubmit}
                handleClose={handleClose}
                show={show}
                handleQuantityIncrease={handleQuantityIncrease}
                handleQuantityDecrease={handleQuantityDecrease}
                value={value}
                handleInputChange={handleInputChange}
                onPointerMove={onPointerMove}
                handleShow={handleShow}
                user={user}/>}

            <Related productId={product._id}/>


            {product.rating && product.rating.length > 0 && <ListReview product={product}/>}

            <Recent productId={product._id}/>
        </Wrapper2>

    );
};

export default memo(Product);