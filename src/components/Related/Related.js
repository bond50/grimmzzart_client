import React, {useState} from 'react';
import PaginationContainer from "../Pagination/PaginationContainer";
import Container from "../Container/Container";
import Card from "../Container/Card";
import ProductCard2 from "../cards/Product/ProductCard2";
import useSWR from "swr";
import {API_URL} from "../../common/config/config";
import {fetcher, swrOptions} from "../../common/fetcher";

const Related = ({productId}) => {
    const {data: relatedProducts, error: relatedError} = useSWR(
        productId ? `${API_URL}/product/related/${productId}` : null,
        fetcher,
        swrOptions
    );

    if (!relatedProducts || relatedProducts.length === 0) {
        return null
    } else
        return (
            <Container class1={'section-bg'}>
                <Card cardHeader={true} title={'You may also like'}>
                    <div className="row">
                        {relatedProducts?.map((product) => (
                            <div className="col-lg-2 col-md-6 mb-3" key={product._id}>
                                <ProductCard2 product={product}/>
                            </div>
                        ))}
                    </div>
                </Card>
            </Container>
        );
};

export default Related;