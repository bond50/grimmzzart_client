
import React from 'react';
import {calculateRatingBreakdown} from "../../common/rating/ratingBreakDown";
import {Icon} from '@iconify/react';
import styles from './Breakdown.module.css';

const Breakdown = ({product}) => {
    const breakdown = calculateRatingBreakdown(product?.rating);
    const totalRatings = product?.rating?.length;

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Rating Breakdown</h4>
            {breakdown.reverse().map((count, index) => {
                const starValue = 5 - index;

                return (
                    <div className={styles['rating-item']} key={starValue}>
                        <div className={styles['star-value']}>
                            <span>{starValue}</span>
                            <Icon icon="tabler:star-filled" className={styles['star-icon']}/>
                        </div>
                        <div className={styles['progress-container']}>
                            <div className="progress">
                                <div
                                    className={`progress-bar bg-warning`}
                                    role="progressbar"
                                    aria-valuenow={starValue}
                                    aria-valuemin="0"
                                    aria-valuemax="5"
                                    style={{width: `${(count / totalRatings) * 100}%`}}
                                >
                                    <span className="visually-hidden">{(count / totalRatings) * 100}% Complete</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.count}>{count}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Breakdown;
