import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import './PaymentCard.css'

const PaymentCard = ({children,payable}) => {
    return (
        <div className='payment-card'>
            <div className="d-flex justify-content-between align-items-center order-summery">
                <h5>ORDER SUMMARY</h5>
                <Button variant="link">See Details ></Button>
            </div>

            <div className="card">
                <div className="card-body pay-details">
                    <p> AMOUNT PAYABLE</p>
                    <p>KES {payable}</p>
                </div>
            </div>
            <h6 className='pay-with'>YOU WILL PAY WITH</h6>
            {children}
            <p className="disclaimer">
                By tapping "PAY" I accept {process.env.REACT_APP_APPNAME}´s <Link
                to={'/terms/payment'}>
                Payment Terms & Conditions
            </Link>,

                <Link to={'/terms/general'}>
                    {' '} General Terms and
                    Conditions
                </Link>,
                and {' '}
                <Link to={'/terms/cookie'}>
                    Privacy and Cookie Notice
                </Link>
            </p>
            <p className="note">
                Please note: {process.env.REACT_APP_APPNAME} will never ask you for your password, PIN, CVV or full card
                details over
                the phone or via email.
            </p>
            <p className='help'>
                Need help ?
                <Link to={'/contact'}>
                    Contact us
                </Link>
            </p>

        </div>


    );
};

export default PaymentCard;