import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {couponApplied} from "../../redux/slices/coupon";
import {toast} from "react-toastify";
import {addToCart, updateCartItemQuantity} from "../../redux/slices/cart";
import {Msg} from "../toast/Msg";
import classes from './cartUtils.module.css'
import {getCartFromLocalStorage} from "./getCartFromLocalStorage";


export const getProductIndex = (cart, productId) => {
    return cart.findIndex(item => item._id === productId);
};


export const updateCartAndDispatch = (cart, dispatch) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(setTotalAfterDiscount(0));
    dispatch(couponApplied(false));
    dispatch(addToCart(cart));
};

export const handleCart = (product, dispatch, navigate) => {
    let cart = getCartFromLocalStorage(); // Retrieve cart from localStorage

    // Check if product is already in the cart
    const productIndex = getProductIndex(cart, product._id);

    if (productIndex === -1) {
        // Product not found, add it with count 1
        cart = [...cart, {...product, count: 1}];
    } else {
        // Product found, increment count
        cart = cart.map((item, index) =>
            index === productIndex ? {...item, count: item.count + 1} : item
        );
    }


    updateCartAndDispatch(cart, dispatch);
    toast(<Msg handleClick={() => navigate('/cart')}/>, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: classes.ToastMessage,
        hideProgressBar: true,
        closeButton: false,
    });
};

export const handleQtyIncrease = (product, dispatch) => {
    console.log(product)
    let cart = getCartFromLocalStorage();
    const updatedCart = cart.map(item => {
        if (item._id === product._id) {
            return {
                ...item,
                count: item.count + 1
            };
        }
        return item;
    });
    updateCartAndDispatch(updatedCart, dispatch);
}

export const handleQtyDecrease = (product, dispatch) => {
    let cart = getCartFromLocalStorage();
    const updatedCart = cart.reduce((acc, item) => {
        if (item._id === product._id) {
            const newCount = item.count - 1;
            if (newCount >= 1) {
                acc.push({
                    ...item,
                    count: newCount
                });
            } else {
                toast.success('Item removed from cart', {position: toast.POSITION.BOTTOM_CENTER});
            }
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
    updateCartAndDispatch(updatedCart, dispatch);
};

