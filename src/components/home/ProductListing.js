import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import useSWR, {preload} from 'swr';
import {fetcher} from '../../common/fetcher';
import {API_URL} from '../../common/config/config';
import PaginationContainer from "../Pagination/PaginationContainer";
import Loader from "../../common/Loader/Loader";

const ProductListing = ({
                            sectionClass = '',
                            sortField,
                            containerClass = '',
                            jumbotronTexts,
                            title = '',
                            pageSize = 6,
                            filter,
                        }) => {
    const order = 'desc';
    const [page, setPage] = useState(1);
    preload(
        `${API_URL}/products/list/some?page=${page}&sort=${sortField}&order=${order}`,
        fetcher
    );
    preload(`${API_URL}/products/total`, fetcher);

    const {data: products, error: productsErr} = useSWR(
        `${API_URL}/products/list/some?page=${page}&sort=${sortField}&order=${order}`,
        fetcher
    );
    const {data: totalCount, error: countErr} = useSWR(
        filter
            ? `${API_URL}/products/total?filter=${filter}`
            : `${API_URL}/products/total`,
        fetcher
    );
    const totalPages = Math.ceil(totalCount / pageSize);

    useEffect(() => {
        // Preload the next page when the current page changes
        if (page < totalPages) {
            preload(
                `${API_URL}/products/list/some?page=${page + 1}&sort=${sortField}&order=${order}`,
                fetcher
            );
        }
    }, [page, totalPages, sortField]);

    const isLoading = !products && !totalCount; // Data is loading if either is not available
    const hasProducts = products && products.length > 0; // We have products if 'products' is not null and its length > 0

    if (isLoading) {
        return <Loader/>;
    }

    if (productsErr) {
        return <p>Failed to fetch products</p>;
    }

    if (countErr) {
        return <p>Failed to get total products</p>;
    }

    if (!hasProducts) {
        return null;
    }
    return (
        <PaginationContainer
            sectionClass={sectionClass}
            containerClass={containerClass}
            jumbotronTexts={jumbotronTexts}
            title={title}
            products={products}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
        />
    );
};

ProductListing.propTypes = {
    sectionClass: PropTypes.string,
    sortField: PropTypes.string.isRequired,
    jumbotronTexts: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
};

export default ProductListing;
