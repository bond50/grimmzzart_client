import React, {lazy, Suspense, useCallback, useEffect, useRef, useState} from 'react';
import {MDBSpinner} from 'mdb-react-ui-kit';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from '@iconify/react';
import defaultImage from '../../images/default.jpg';
import Input from '../../ui/input/Input';
import {checkValidity, updateObject} from '../../common/Utility';
import {
    createStripeOrderForUser,
    emptyUserCart,
    initiateMPESAOderForUser,
} from '../../services/user.service';
import {clearMessage, setMessage} from '../../redux/slices/message';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {io} from 'socket.io-client';
import {toast} from 'react-toastify';
import {addToCart} from '../../redux/slices/cart';
import {setTotalAfterDiscount} from '../../redux/slices/totalAfterDiscount';
import {selectPaymentMethod} from '../../redux/slices/paymentMethods';
import {Link, useNavigate} from 'react-router-dom';
import './Mpesa.css';
import axios from "axios";
import {API_URL} from "../../common/config/config";
import Alert from "../messages/Alert";

const Mpesa = ({
                   address,
                   payable,
                   cartTotal,
                   coupon: couponApplied,
                   discountAmount,
               }) => {
    const initialValues = {
        mpesaPhone: {
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    name: 'phone',
                    required: true,
                    label: 'Phone number*',
                },
                value: '',
                validation: {
                    required: true,
                    isPhoneNumber: true,
                },
                validationMessage: [],
                valid: false,
                touched: false,
            },
        },
        formIsValid: false,
    };
    const {auth, coupon, totalAfterDiscount, message, paymentMethods} =
        useSelector((state) => ({...state}));

    const dispatch = useDispatch();
    const [values, setValues] = useState(initialValues);
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)


    const [paymentStatus, setPaymentStatus] = useState({
        loading: false,
        succeeded: false,
        processing: false,
        initiating: false,
        error: false,
    });
    const [socket, setSocket] = useState(null);
    const swalInstance = useRef(null);


    const {succeeded, loading, error, initiating, processing} = paymentStatus;
    useEffect(() => {
        return () => {
            dispatch(clearMessage());
        };
    }, [dispatch]);


// Establish socket connection when the component mounts and cleanup on unmount
    useEffect(() => {
        const socketIO = io(process.env.REACT_APP_API_DEVELOPMENT_SOCKET);
        setSocket(socketIO);

        // Cleanup function will be called on component unmount
        return () => {
            if (socketIO.connected) {
                socketIO.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (processing) {
            socket.on('mpesaPaymentFailed', response => {
                setPaymentStatus({
                    ...paymentStatus,
                    loading: false,
                    succeeded: false,
                    error: true,
                });
                toast.error(response.ResultDesc);
                dispatch(
                    setMessage({
                        content: response.ResultDesc,
                        type: 'danger',
                    })
                );
            });

            socket.on('mpesaPaymentSuccess', response => {

                setPaymentStatus({
                    ...paymentStatus,
                    succeeded: true,
                    loading: false,
                    processing: false,
                });
                dispatch(
                    setMessage({
                        content: 'Payment received successfully',
                        type: 'success',
                    })
                );
                toast.success(`Payment successful`);
                MySwal
                    .fire({
                        title: 'Transaction successful',
                        text: 'Your transaction has been successfully processed',
                        icon: 'success',
                        html: '',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        backdrop: 'rgba(0,0,0,0.9)',
                        showConfirmButton: true,
                        didOpen: () => {
                            console.log('DESC', response.result.ResultDesc);
                            // dispatch(setMessage(data.result.ResultDesc))

                            localStorage.removeItem('cart');
                            dispatch(addToCart([]));
                            dispatch(setTotalAfterDiscount(0));
                            emptyUserCart(auth.user.token).then(() => {
                                console.log('CART EMPTY');
                            });
                            dispatch(clearMessage());
                            dispatch(selectPaymentMethod('Mpesa'));
                        },
                        didClose() {
                            navigate(`/user/success/${response.result.transactionId}`, {
                                state: {
                                    transactionDate: response.result.transactionDate,
                                    transactionId: response.result.transactionId,
                                    saved: response.saved,
                                    name: response.result.name,
                                    mpesa: true,
                                    email: response.result.email,
                                    transactionAmount: response.result.transactionAmount,
                                },
                            });
                        },
                    }).then(r => {
                    console.log('then in swal')
                })

            });
        }

        // Cleanup function
        return () => {
            if (socket) {
                socket.off('mpesaPaymentFailed');
                socket.off('mpesaPaymentSuccess');
            }
        };
    }, [socket, paymentStatus, dispatch, processing]);


    const formElementsArray = Object.values(values.mpesaPhone).map((config) => (
        <Input
            key={config.elementConfig.name}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            disabled={loading || succeeded || processing}
            message={config.validationMessage}
            invalid={!config.valid}
            shouldValidate={config.validation.required}
            touched={config.touched}
            changed={(event) => handleChange(event, config.elementConfig.name)}
            id='Mpesa'
        />
    ));

    function handleChange(event, inputIdentifier) {
        const value = event.target.value;
        const updatedFormElement = updateObject(
            values.mpesaPhone[inputIdentifier],
            {
                value,
                valid: checkValidity(value, values.mpesaPhone[inputIdentifier], ''),
                touched: true,
            }
        );

        const updatedLoginForm = updateObject(values.mpesaPhone, {
            [inputIdentifier]: updatedFormElement,
        });

        const formIsValid = Object.values(updatedLoginForm).every(
            (input) => input.valid
        );

        setValues({mpesaPhone: updatedLoginForm, formIsValid: formIsValid});
    }

    const initiatePayment = (e) => {
        e.preventDefault();
        setPaymentStatus({
            ...paymentStatus,
            initiating: true,
            loading: true,
            error: false,
        });
        dispatch(
            setMessage({
                content: 'Initializing payment request',
                type: 'info',
            })
        );

        axios
            .post(
                `${API_URL}/user/initiate-mpesa-order`,
                {
                    phoneNumber: '727918998',
                    couponApplied,
                    selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
                    shippingAddress: address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                    },
                }
            )
            .then((response) => {
                setPaymentStatus({
                    ...paymentStatus,
                    initiating: false,
                    processing: true,
                    loading: true
                });
                dispatch(
                    setMessage({
                        content: response.data.CustomerMessage,
                        type: 'info',
                    })
                );
            })
            .catch((error) => {
                let errorMessage = '';
                if (error.response) {
                    errorMessage = error.response.data.error.errorMessage;
                } else if (error.request) {
                    errorMessage = error.message;
                } else {
                    errorMessage = error.message;
                }

                dispatch(
                    setMessage({
                        content: errorMessage,
                        type: 'danger',
                    })
                );
                setPaymentStatus({
                    ...paymentStatus,
                    initiating: false,
                    loading: false,
                });
            });
    };


    const showMessage = () => <div>
        <Alert msg={message.content} label={message.type}
               type={message.type} reload={message.type === 'danger'}/>
    </div>


    return (
        <div className='mpesa'>
            <div className='card'>
                <div className='card-body mpesa-details'>
                    <p>M-PAYMENT</p>
                    <img src='/images/mpesa.png' alt='mpesa-logo'/>
                </div>
                <div className='divider'/>
                <form onSubmit={initiatePayment} className='mpesa-form'>
                    {formElementsArray}
                    <button
                        className='btn btn-block pay-now'
                        disabled={!values.formIsValid || loading || processing || succeeded}
                    >
                        {loading && <MDBSpinner grow='sm' role='status'/>}
                        {loading ? 'Loading...' : `PAY: KES ${payable}`}
                    </button>

                </form>

                <div className='my-3'>
                    {message.content && showMessage()}
                </div>
                <div className='divider'/>
                <Link to='/payment-methods'>USE A DIFFERENT PAYMENT METHOD</Link>
            </div>
        </div>
    );
};

export default Mpesa;
