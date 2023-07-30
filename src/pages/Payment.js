import React, {useEffect, useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useLocation, useNavigate} from "react-router-dom";
import StripeCheckout from "../components/payment/StripeCheckout";
import {useDispatch, useSelector} from "react-redux";
import Paypal from "../components/payment/Paypal";
import Mpesa from "../components/payment/Mpesa";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {createPaymentIntent} from "../services/payment.service";
import {setTotalAfterDiscount} from "../redux/slices/totalAfterDiscount";
import {clearMessage} from "../redux/slices/message";
import PaymentCard from "../components/payment/PaymentCard";
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Payment = () => {
    const [stripeClientSecret, setStripeClientSecret] = useState('');
    const [paypalClientSecret, setPaypalClientSecret] = useState('');
    const [payable, setPayable] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [processing, setProcessing] = useState(false);
    const {auth, coupon, totalAfterDiscount, paymentMethods} = useSelector(state => ({...state}));

    const selectedPaymentMethod = useSelector((state) => state.paymentMethods.selectedPaymentMethod);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        createPaymentIntent(auth.user.token, {
            couponApplied: coupon,
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod
        }).then(res => {
            setStripeClientSecret(res.data.stripeClientSecret);
            setPaypalClientSecret(res.data.paypalClientSecret);
            setCartTotal(res.data.cartTotal);
            setPayable(res.data.payable);
            setDiscountAmount(res.data.discountAmount);
            dispatch(setTotalAfterDiscount(res.data.totalAfterDiscount));
        }).catch(e => {
            console.log(e);
        });
    }, [auth.user.token, coupon, dispatch, paymentMethods.selectedPaymentMethod]);

    const initialOptions = {
        "client-id": paypalClientSecret,
        currency: "USD",
        intent: "capture",
    };


    useEffect(() => {

        if (location.state?.from !== 'checkout') {
            console.log('Redirecting to checkout...');
            navigate('/checkout');
        }

    }, [location.state, navigate]);


    if (showForm && location.state && location) {
        return (
            <section className='section-bg-3 sectionClass30'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <PaymentCard payable={payable}>
                                {selectedPaymentMethod === 'Card' && stripeClientSecret &&
                                    <Elements stripe={promise}>
                                        <StripeCheckout
                                            address={auth.user.address}
                                            clientSecret={stripeClientSecret}
                                            payable={payable}
                                            discountAmount={discountAmount}
                                            cartTotal={cartTotal}
                                        />
                                    </Elements>
                                }
                                {selectedPaymentMethod === 'Paypal' && paypalClientSecret &&
                                <PayPalScriptProvider options={initialOptions}>
                                    <Paypal
                                        address={auth.user.address}
                                        payable={payable}
                                        clientSecret={paypalClientSecret}
                                        discountAmount={discountAmount}
                                        cartTotal={cartTotal}
                                    />
                                </PayPalScriptProvider>
                                }
                                {selectedPaymentMethod === 'Mpesa' &&
                                    <Mpesa
                                        address={auth.user.address}
                                        payable={payable}
                                        coupon={coupon}
                                        discountAmount={discountAmount}
                                        cartTotal={cartTotal}
                                    />
                                }

                            </PaymentCard>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Payment;
