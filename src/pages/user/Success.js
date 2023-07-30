import
    React, {useEffect, useState}
    from
        'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {clearMessage} from '../../redux/slices/message';
import {Icon} from '@iconify/react';
import dayjs from 'dayjs';

require('dayjs/locale/en');
const ConfirmationPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    if (!location.state) {

        return <div className='container'>
            <div className="my-5">
                <h1>The transaction does not exist</h1>
                <h5>
                    <Link to={`/user/orders`}>
                        Click to see purchase history
                    </Link>
                </h5>

            </div>
        </div>
    }

    const {
        transactionId,
        transactionDate,
        name,
        email,
        transactionAmount,
    } = location.state;

    if (!location.state) {
        navigate('/market');
        return null;
    }
    const date1 = dayjs(location.state.saved.deliveryStartDate).format('MMMM D, YYYY');
    const date2 = dayjs(location.state.saved.deliveryEndDate).format('MMMM D, YYYY');

    const td = new Date(transactionDate);
    let formattedDate = dayjs()
        .startOf('month')
        .add(1, 'day')
        .set('year', td.getFullYear())
        .format('YYYY-MM-DD HH:mm:ss');
    if (location.state.mpesa) {
        formattedDate = dayjs(transactionDate.toString(), 'YYYYMMDDHHmmss').locale('en').format('MMMM D, YYYY');
        ;
    }


    return (
        <div className='row mt-5'>
            <div className="col-md-6 offset-3">
                <div className="container">
                    <div className="card pt-3">
                        <div className=" text-center">
                            <Icon
                                icon="fa6-solid:circle-check"
                                className="text-success"
                                fontSize={60}
                            />
                            <h3 className="my-3">Transaction Complete</h3>
                            <p>Your transaction has been successfully processed</p>
                        </div>
                        <div className="card-body p-0 text-center">
                            <table className="table table-striped table-sm">
                                <tbody>
                                <tr>
                                    <th>Transaction ID</th>
                                    <td id="transactionId">{transactionId}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td id="transactionDate">{formattedDate}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td id="name">{name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td id="email">{email}</td>
                                </tr>
                                <tr>
                                    <th>Amount</th>
                                    <td id="transactionAmount">{transactionAmount}</td>
                                </tr>
                                <tr>
                                    <th>Order ID</th>
                                    <td id="orderId">{location.state.saved.orderId}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td id="orderStatus">{location.state.saved.orderStatus}</td>
                                </tr>
                                <tr>
                                    <th>Delivery</th>
                                    <td id="deliveryWindow">{`${date1} to ${date2}`}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer text-center">
                            <h5>
                                <Link to={`/user/orders`}>
                                    Click to see purchase history
                                </Link>

                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ConfirmationPage;