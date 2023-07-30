import React from 'react';

import Container from "../Container/Container";
import Card from "../Container/Card";
import ProductCard2 from "../cards/Product/ProductCard2";
import Pagination from "./Pagination";

const PaginationContainer = ({
                                 sectionClass,
                                 containerClass,
                                 jumbotronTexts,
                                 title,
                                 products,
                                 page,
                                 totalPages,
                                 setPage
                             }) => {
    return (
        <Container class1={`${sectionClass}`} containerClass={containerClass}>
            <Card cardHeader={true} jumbotronTexts={jumbotronTexts} title={title}>
                <div className="row">
                    {products.map((product, index) => (
                        <div className="col-lg-2 col-md-6 mb-3" key={product._id}>
                            <ProductCard2
                                product={product}
                                id={`${product._id}--${index}`}
                                hideQty hideCat hideDesc hideRating/>
                        </div>
                    ))}
                </div>
                <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
            </Card>
        </Container>
    );
};

export default PaginationContainer;
