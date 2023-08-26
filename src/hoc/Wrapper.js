import React from 'react';
import MetaData from "../common/helmet/MetaData";
import Breadcrumb from "../components/BreadCrump/BreadCrump";
import styles from './Wrapper.module.css'

const Wrapper = ({title, children}) => {
    return (
        <div className={styles.wrapper}>
            <MetaData title={title}/>
            <Breadcrumb/>
            <section className='section-bg'>
                <div className="container">
                    <div className={`card ${styles.card}`}>
                        <div className="card-header">
                            <h1 className='card-title'>{title}</h1>
                        </div>
                        <div className="card-body">
                            {children}
                        </div>
                        <div className="card-footer">
                            <p className={`d-flex justify-content-center align-items-center ${styles.footer}`}>{title} -
                                All Rights Reserved
                            </p>
                        </div>
                    </div>

                </div>

            </section>

        </div>
    );
};

export default Wrapper;