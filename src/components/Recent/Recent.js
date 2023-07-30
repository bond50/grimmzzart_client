import React from 'react';
import {useSelector} from 'react-redux';
import Container from '../Container/Container';
import Card from '../Container/Card';
import ProductCard2 from '../cards/Product/ProductCard2';

const Recent = ({productId}) => {
    const {recentlyViewed} = useSelector((state) => state.recentlyViewed); // Get recently viewed items from Redux store

    // If productId exists, filter out the item, else return the whole array
    const filteredRecentlyViewed = productId ?
        recentlyViewed.filter((product) => product._id !== productId).slice(0, 6) :
        recentlyViewed.slice(0, 6);

    // Check if the filteredRecentlyViewed array is empty
    if (filteredRecentlyViewed.length === 0) {
        return null; // Don't render the component if the array is empty
    }

    return (
        <Container class1={'section-bg-2'}>
            <Card cardHeader={true} title={'Recently viewed'}>
                <div className="row">
                    {filteredRecentlyViewed.map((product) => (
                        <div className="col-lg-2 col-md-6 mb-3" key={product._id}>
                            <ProductCard2 product={product} hideCat hideDesc hideRating/>
                        </div>
                    ))}
                </div>
            </Card>
        </Container>
    );
};

export default Recent;
