import React from 'react';
import ProductListing from './ProductListing';

const Featured = () => {
    let filer= 'isFeatured'
    return (
        <ProductListing
            sectionClass='section-bg'
            title="Featured Products"
            sortField="isFeatured"
            filter={filer}
        />
    );
};

export default Featured;
