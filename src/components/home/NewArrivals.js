import React from 'react';
import ProductListing from './ProductListing';

const NewArrivals = () => {
    return (
        <ProductListing
            sectionClass='section-bg-2'
            sortField="createdAt"
            jumbotronTexts={[
                'New arrivals',
                'Just in',
            ]}
        />
    );
};

export default NewArrivals;
