import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {applyCoupon, emptyUserCart, getUserCart} from "../services/user.service";
import {toast} from "react-toastify";
import {couponApplied} from "../redux/slices/coupon";
import {Link, useLocation, useNavigate} from "react-router-dom";
import DeliveryAddress from "../components/wizard/checkout/DeliveryAddress";
import {addToCart} from "../redux/slices/cart";
import {setTotalAfterDiscount} from "../redux/slices/totalAfterDiscount";
import {selectPaymentMethod} from "../redux/slices/paymentMethods";
import {clearMessage} from "../redux/slices/message";
import Wrapper from "../hoc/Wrapper";


const Checkout = () => {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [coupon, setCoupon] = useState('')
    // const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [discountError, setDiscountError] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {auth, cart, coupon: couponUsed, message, totalAfterDiscount} = useSelector((state) => ({...state}));
    const token = auth.isLoggedIn && auth.user.token && auth.user.token
    const navigate = useNavigate()
    const location = useLocation();


    const paymentMethods = useSelector((state) => state.paymentMethods.paymentMethods);
    const selectedPaymentMethod = useSelector((state) => state.paymentMethods.selectedPaymentMethod);

    useEffect(() => {
        if (location.state?.from !== 'cart') {
            navigate('/cart');
        }
    }, [location, navigate]);


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch])

    useEffect(() => {
        getUserCart(token).then(response => {
            // console.log(JSON.stringify(response.data, null, 4))
            setTotal(response.data.cartTotal)
            setProducts(response.data.products)
        }).catch(e => {
            if (e.response.data.msg) {
                navigate(-1)
            } else {
                console.log(e)
            }
        })
    }, [cart.length, navigate, token])


    //coupon

    function applyDiscountCoupon() {
        setLoading(true)
        applyCoupon(auth.user.token, {coupon, couponUsed}).then(res => {
            if (res.data.ok) {
                // setTotalAfterDiscount(res.data.totalAfterDiscount)
                dispatch(setTotalAfterDiscount(res.data.totalAfterDiscount))
                dispatch(couponApplied(true))
                setLoading(false)
                toast.success('Coupon applied', {
                    position: toast.POSITION.BOTTOM_CENTER

                })
            }
            if (res.data.err) {
                setDiscountError(res.data.err)
                dispatch(couponApplied(false))
                setLoading(false)
                toast.error(res.data.err, {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }

        }).catch(e => {
            console.log(e)
            setLoading(false)
        })

    }

    //coupon


    const emptyCart = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("cart")
        }
        dispatch(addToCart([]))
        emptyUserCart(auth.user.token).then(r => {
            setProducts([])
            setTotal(0)
            setTotalAfterDiscount(0)
            setCoupon('')
            toast.success('Cart emptied.')
        })

    }

    //


    const handleRadioChange = (e) => {
        dispatch(selectPaymentMethod(e.target.value));
    };

    if (token) {
        return (
            <>
                {
                    location.state && <Wrapper title='Checkout'>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className='card-header'>
                                        <h3 className="card-title">
                                            Shipping information
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <DeliveryAddress/>
                                    </div>
                                    <div className='card-footer'>
                                        {message.message && <div className='text-danger'>
                                            {message.message}
                                        </div>}
                                        <div className="d-flex justify-content-between">
                                            <p className=''>{couponUsed ? 'Total after discount' : 'Cart total'} </p>
                                            <p> KES {couponUsed ? totalAfterDiscount.value : total}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className='card-title'>Order Summery</h4>
                                        <p className='card-text'>Number of products {products.length}</p>
                                    </div>

                                    <div className="card-body">
                                        <div className='mt-3'>
                                            {products.map((p, i) => {
                                                return <p className='card-text' key={i}>{p.product.title} {' '}
                                                    x {p.count} = {' '} {p.product.price * p.count}
                                                </p>

                                            })}
                                            <p className='card-text'>Cart Total : KES {total}</p>
                                            <p className='card-text'>Saved {totalAfterDiscount.value}</p>
                                            {totalAfterDiscount.value > 0 && (
                                                <div className='bg-success'><p className='text-white px-4 py-3'>Discount
                                                    applied: Total
                                                    payable: KES {totalAfterDiscount.value}</p></div>
                                            )}
                                        </div>
                                        <div className='mt-3'>
                                            <h2 className="card-title">Payment Method</h2>

                                            <div>
                                                {paymentMethods.map((method) => (
                                                    <div key={method}
                                                         style={{display: "inline-block", marginRight: "10px"}}>
                                                        <input
                                                            type="radio"
                                                            value={method}
                                                            checked={selectedPaymentMethod === method}
                                                            onChange={handleRadioChange}
                                                            style={{marginRight: "5px"}}
                                                        />
                                                        <label style={{fontWeight: "bold"}}>{method}</label>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>


                                    </div>

                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    onClick={() => navigate('/payment', {
                                                        state: {
                                                            from: 'checkout'
                                                        }
                                                    })}
                                                    disabled={!auth.addressSaved || !products.length || !selectedPaymentMethod}>
                                                    Next step
                                                </button>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <button className="btn btn-danger btn-block" onClick={emptyCart}
                                                        disabled={!products.length}>
                                                    Empty cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Wrapper>
                }

            </>
        );
    }
    if (!token) {
        return <Wrapper title='Checkout'>
            <div className='container'>
                <p className='card-title'>Login to proceed</p>
                < button className='btn   mt-2 btn-primary '>
                    <Link to="/auth/login"
                          state={{from: '/checkout'}}>
                <span className='text-white'>
                Click to Login
                </span>
                    </Link>
                </button>
            </div>
        </Wrapper>
    }


};

export default Checkout;