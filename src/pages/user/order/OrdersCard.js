import React from 'react';
import './Orders-card.css'
import {Link} from "react-router-dom";
import {PDFDownloadLink} from "@react-pdf/renderer";
import Invoice from "../../../components/order/Invoice";

const OrdersCard = ({order}) => {

    console.log(order)

    const showOrderInTable = () => {
        return <table className="table">
            <thead className='table-light'>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Number of items</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
            </tr>
            </thead>
            <tbody>
            {order.products.map((p, i) => {
                return <tr key={i}>

                    <td>{i + 1}</td>

                    <td>

                        {p.product.images &&
                            <img src={p.product.images[0]?.url} alt={p.product.title} className='img-fluid'/>}
                    </td>
                    <td><strong>{p.product.title}</strong></td>
                    <td>{p.count}</td>
                    <td>{p.product.brand.name}</td>
                    <td>{p.product.color}</td>
                </tr>
            })}


            </tbody>
        </table>
    }
    const getStatusClass = (status) => {
        const uppercaseStatus = status.toUpperCase();
        switch (uppercaseStatus) {
            case 'ORDER PLACED':
                return 'status-ordered';
            case 'WAITING TO BE SHIPPED':
                return 'status-waiting';
            case 'CANCELLED':
                return 'status-cancelled';
            case 'SHIPPED':
                return 'status-shipped';
            case 'OUT FOR DELIVERY':
                return 'status-out-for-delivery';
            case 'DELIVERED':
                return 'status-delivered';
            case 'PENDING':
                return 'status-pending';
            case 'RETURNED':
                return 'status-returned';
            case 'REFUNDED':
                return 'status-refunded';
            case 'DISPATCHED':
                return 'status-dispatched';
            default:
                return 'status-default';
        }
    }

    const showStatus = (status) => {
        return (<div className={`status ${getStatusClass(status)}`}>
            {status}
        </div>);
    }


    return (<div className="card orders-card">
        <div className="card-header">
            <div className='d-flex justify-content-between '>
                <p className="order-number">Order Number: <span>{order.orderId}</span></p>
                <div className="order-status">
                    {showStatus(order.orderStatus)}
                </div>



                    <PDFDownloadLink document={
                        <Invoice order={order}/>}
                                     className='invoice'
                                     fileName='invoice.pdf'>
                        Download your invoice
                    </PDFDownloadLink>


                <Link to={'#'} className="details-link">
                    See details
                </Link>
            </div>
        </div>
        <div className="card-body">
            {showOrderInTable()}
        </div>

    </div>);
};

export default OrdersCard;