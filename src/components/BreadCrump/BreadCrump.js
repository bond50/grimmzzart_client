import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import  './Breadcrump.css'

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
        <div className='breadcrumbs'>
            <nav>
                <div className="container">
                    <ol>
                        <li><Link to="/">Home</Link></li>
                        <li>{breadcrumbs}</li>
                    </ol>
                </div>
            </nav>
        </div>
    );
};

export default Breadcrumb;
