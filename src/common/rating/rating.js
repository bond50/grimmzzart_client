import React from 'react';
import {Rating} from 'react-simple-star-rating';
import classes from './Rating.module.css';
import {calculateAverageRating} from "./averageRating";

export const showAverageRating = (product, size = 16) => {
    const averageRating = calculateAverageRating(product?.rating);
    if (averageRating > 0) {
        return (
            <Rating
                initialValue={averageRating}
                readonly
                fillColor="#f6b01e"
                allowFraction
                size={size}
            />
        );
    } else {
        return <span className={classes.Rating}>No ratings yet</span>;
    }
};

