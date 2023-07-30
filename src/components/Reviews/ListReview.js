import React from 'react';
import Card from "../Container/Card";
import classes from './ListReview.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import the locale you want to use (e.g., 'en' for English)
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Import the localizedFormat plugin
import {showAverageRating} from "../../common/rating/rating";
import {calculateAverageRating} from "../../common/rating/averageRating";
import BreakDown from "./BreakDown";
import {Rating} from "react-simple-star-rating";

dayjs.extend(localizedFormat);
const ListReview = ({product}) => {
    console.log('SINGLE PRODUCT', product)
    const averageRating = calculateAverageRating(product?.rating);

    return (
        <section className='section-bg-2'>
            <div className="container">
                <Card
                    cardHeader={true}
                    title='Customer feedback'
                >
                    <div className="row">
                        <div className="col-lg-3">
                            <h5
                                className={classes['title-rating']}>
                                <span>({product.rating.length})</span>
                                Verified ratings
                            </h5>
                            <div className={classes.RatingBlock}>
                                <div className={classes.AverageRatingContainer}>
                                    <span className={classes.AverageRating}>{averageRating}</span>
                                    <span className={classes.AverageRatingText}>/ 5</span>
                                </div>
                                <div className={classes.Star}>
                                    {showAverageRating(product, 20)}
                                </div>
                                <div className={classes.Verified}>
                                    <p>{product.rating.length} verified ratings</p>
                                </div>

                                <hr/>
                                <div className={classes.BreakdownContainer}>
                                    <BreakDown product={product}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {product.rating?.map((review, i) => (
                                <div className={classes.ReviewCard} key={i}>
                                    <div className={classes.ReviewRating}>
                                        <Rating
                                            initialValue={review.star}
                                            readonly
                                            fillColor="#f6b01e"
                                            allowFraction
                                            size={18}
                                        />
                                    </div>
                                    <p className={classes.ReviewComment}>{review.value}</p>
                                    <p className={classes.ReviewDate}>
                                        {dayjs(review.updatedAt).locale('en').format('L HH:mm')} by {review.postedBy.firstName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default ListReview;
