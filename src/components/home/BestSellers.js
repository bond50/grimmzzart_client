import React from 'react';
import ProductListing from './ProductListing';

const BestSellers = () => {
    return (
        <ProductListing
            sectionClass='section-bg-2'
            sortField="sold"
            jumbotronTexts={['Best selling']}
        />
    );
};

export default BestSellers;
