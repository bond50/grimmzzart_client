import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styles from './Breadcrump.module.css'

const Breadcrumb = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState('');

    useEffect(() => {
        const linkPath = location.pathname.split('/');
        linkPath.shift();
        const lastSegment = linkPath[linkPath.length - 1];

        let breadcrumbs = '';

        if (linkPath.length === 1) {
            breadcrumbs = lastSegment.replace(/-/g, ' ');
        } else if (linkPath.length > 1) {
            breadcrumbs = linkPath
                .slice(1)
                .map(segment => segment.replace(/-/g, ' '))
                .join(' / ');
        }

        setBreadcrumbs(breadcrumbs);
    }, [location]);

    return (
        <nav aria-label="breadcrumb">
            <ol className={`${styles.breadcrumb} breadcrumb`}>
                <li className={`${styles['breadcrumb-item']} breadcrumb-item`}>
                    <a href="/">Home</a>
                </li>
                <li className={`${styles['breadcrumb-item']} breadcrumb-item ${styles['active']}`} aria-current="page">
                    {breadcrumbs}
                </li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
