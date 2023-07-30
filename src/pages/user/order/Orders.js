// import React, {useCallback, useEffect, useState} from 'react';
// import {useSelector} from 'react-redux';
// import ShowPaymentInfo from '../../../components/cards/PaymentInfo/ShowPaymentInfo';
// import {Navigate} from 'react-router-dom';
// import {getUserOrders} from '../../../services/user.service';
// import {PDFDownloadLink} from "@react-pdf/renderer";
// import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
// import Invoice from "../../../components/order/Invoice";
// import './Orders.css'
//
//
// const History = () => {
//     const {token} = useSelector(state => (state.auth.user))
//     const [orders, setOrders] = useState([])
//
//
//     const loadUserOrders = useCallback(() => {
//         getUserOrders(token).then(res => {
//             setOrders(res.data)
//         }).catch(e => {
//             console.log(e)
//         })
//
//     }, [token])
//
//     useEffect(() => {
//         loadUserOrders()
//     }, [loadUserOrders])
//
//     const showOrderInTable = order => {
//
//         return <table className="table">
//             <thead className='table-light'>
//             <tr>
//                 <th scope="col">Title</th>
//                 <th scope="col">Price</th>
//                 <th scope="col">Brand</th>
//                 <th scope="col">Color</th>
//                 <th scope="col">Count</th>
//                 <th scope="col">Shipping</th>
//             </tr>
//             </thead>
//             <tbody>
//             {order.products.map((p, i) => {
//
//                 return <tr key={i}>
//                     <td><strong>{p.product.title}</strong></td>
//                     <td>{p.product.price}</td>
//                     <td>{p.product.brand}</td>
//                     <td>{p.color}</td>
//                     <td>{p.count}</td>
//                     <td>{p.product.shipping === 'No' ? <CloseCircleOutlined className='text-danger'/> :
//                         <CheckCircleOutlined className='text-success'/>}</td>
//                 </tr>
//             })}
//
//
//             </tbody>
//         </table>
//     }
//
//
//     function showDownloadLink(order) {
//         return <PDFDownloadLink document={
//             <Invoice order={order}/>} className='btn btn-sm btn-block btn-outline-primary' fileName='invoice.pdf'>
//             Download your invoice
//         </PDFDownloadLink>
//
//     }
//
//
//     console.log('',JSON.stringify(orders,null,4))
//     const showEachOrder = () => {
//         return orders.reverse().map((order, i) => {
//             console.log(order)
//             return (
//                 <div key={i} className='card mt-5 p-3 text-center'>
//                     <ShowPaymentInfo order={order}/>
//                     {showOrderInTable(order)}
//                     <div className="row">
//                         <div className="col">
//                             {showDownloadLink(order)}
//                         </div>
//                     </div>
//
//                 </div>
//             );
//         })
//
//     };
//
//     return (
//         <div className={'container-fluid'}>
//             <div className="row mt-5 ">
//
//                 <div className="col-md-10">
//                     <h4>{orders.length > 0 ? 'Your orders' : 'No purchase orders'}</h4>
//                     {showEachOrder()}
//                 </div>
//             </div>
//
//         </div>
//     );
// };
//
// export default History;


import React, {useCallback, useEffect, useState} from 'react';
import './Orders.css'
import {Link} from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useSelector} from "react-redux";
import {getUserOrders} from '../../../services/user.service';
import OrdersCard from "./OrdersCard";

const Orders = () => {
    const {token} = useSelector(state => (state.auth.user))
    const [orders, setOrders] = useState([])


    const loadUserOrders = useCallback(() => {
        getUserOrders(token).then(res => {
            setOrders(res.data)
        }).catch(e => {
            console.log(e)
        })

    }, [token])

    useEffect(() => {
        loadUserOrders()
    }, [loadUserOrders])
    const showUnsuccessfulOrders = () => {
        return orders.map(order => (
            <OrdersCard key={order._id} order={order}/>
        ))
    };

    const showSuccessfulOrders = () => {
        return orders.map(order => (
            <OrdersCard key={order._id} order={order}/>
        ))
    };

    console.log(orders)

    return (
        <section className='sectionClass30 orders'>
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">
                                <h1>Orders</h1>
                            </div>
                            <div className="card-body">
                                <Tabs
                                    defaultActiveKey="open-orders"
                                    id="orders"
                                    className="mb-3"
                                >
                                    <Tab eventKey="open-orders" title="Placed orders (6)">

                                        {showSuccessfulOrders()}

                                    </Tab>
                                    <Tab eventKey="closed-orders" title="Unsuccessful orders">
                                        {showUnsuccessfulOrders()}
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Orders;