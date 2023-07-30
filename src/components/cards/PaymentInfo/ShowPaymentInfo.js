// import React from 'react';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';
// import defaultImage from '../../../images/default.jpg';
// import { Card, Col, Descriptions, Row, Typography, Button } from 'antd';
// const { Title } = Typography;
//
// const ShowPaymentInfo = ({ order, showStatus = true }) => {
//   return (
//     <Card
//       title={<Title level={4}>{`Order ${order.orderId}`}</Title>}
//       extra={showStatus && <span>{order.orderStatus}</span>}
//       className="mb-4"
//     >
//       <Descriptions>
//         <Descriptions.Item label="Payment Status">
//           {order.paymentStatus.toUpperCase()}
//         </Descriptions.Item>
//         <Descriptions.Item label="Currency">
//           {order.currencyCode}
//         </Descriptions.Item>
//         <Descriptions.Item label="Payment">
//           {order.paymentMethod.toUpperCase()}
//         </Descriptions.Item>
//         <Descriptions.Item label="Date">
//           {dayjs(order.orderDate).format('MMMM D, YYYY')}
//         </Descriptions.Item>
//         <Descriptions.Item label="Amount">
//           {order.amount.toLocaleString('en-US', {
//             style: 'currency',
//             currency: `${order.currencyCode}`,
//           })}
//         </Descriptions.Item>
//       </Descriptions>
//       <Row gutter={16}>
//         {order.products.map((item, index) => (
//           <Col key={index} md={12} lg={6} className="mb-4">
//             <Card
//               cover={
//                 <img
//                   alt={item.product.title}
//                   src={defaultImage}
//                   className="w-100"
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//               }
//             >
//               <Card.Meta
//                 title={item.product.title}
//                 description={
//                   <Row>
//                     <Col>
//                       <strong>Count: </strong>
//                       {item.count}
//                     </Col>
//                     <Col>
//                       <strong>Price: </strong>
//                       {item.product.price}
//                     </Col>
//                   </Row>
//                 }
//               />
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <Row justify="end">
//         <Link
//           to={`/user/order/${order._id}`}
//           state={{ order: order, from: '/user/history' }}
//         >
//           <Button type="primary" className="mr-2">
//             View Order
//           </Button>
//         </Link>
//         {order.shippingStatus === 'shipped' && (
//           <Link to={`/user/order/${order._id}`}>
//             <Button type="success">Track Shipment</Button>
//           </Link>
//         )}
//       </Row>
//     </Card>
//   );
// };
//
// export default ShowPaymentInfo;
import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import defaultImage from '../../../images/default.jpg';

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h4 className="card-title">{`Order ${order.orderId}`}</h4>
        {showStatus && <span>{order.orderStatus}</span>}
      </div>

      <div className="card-body">
        <dl className="row">
          <dt className="col-sm-3">Payment Status</dt>
          <dd className="col-sm-9">{order.paymentStatus.toUpperCase()}</dd>

          <dt className="col-sm-3">Currency</dt>
          <dd className="col-sm-9">{order.currencyCode}</dd>

          <dt className="col-sm-3">Payment</dt>
          <dd className="col-sm-9">{order.paymentMethod.toUpperCase()}</dd>

          <dt className="col-sm-3">Date</dt>
          <dd className="col-sm-9">{dayjs(order.orderDate).format('MMMM D, YYYY')}</dd>

          <dt className="col-sm-3">Amount</dt>
          <dd className="col-sm-9">
            {order.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: `${order.currencyCode}`,
            })}
          </dd>
        </dl>
        <div className="row">
          {order.products.map((item, index) => (
            <div key={index} className="col-md-12 col-lg-6 mb-4">
              <div className="card">
                <img
                  alt={item.product.title}
                  src={defaultImage}
                  className="w-100"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product.title}</h5>
                  <div className="row">
                    <div className="col">
                      <strong>Count: </strong>
                      {item.count}
                    </div>
                    <div className="col">
                      <strong>Price: </strong>
                      {item.product.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <Link
          to={{ pathname: `/user/order/${order._id}`, state: { order: order, from: '/user/history' } }}
          className="btn btn-primary mr-2"
        >
          View Order
        </Link>
        {order.shippingStatus === 'shipped' && (
          <Link to={`/user/order/${order._id}`} className="btn btn-success">
            Track Shipment
          </Link>
        )}
      </div>
    </div>
  );
};

export default ShowPaymentInfo;