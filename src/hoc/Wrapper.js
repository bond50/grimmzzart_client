import React from 'react';
import MetaData from "../common/helmet/MetaData";
import Breadcrumb from "../components/BreadCrump/BreadCrump";
import styles from './Wrapper.module.css'

const Wrapper = ({title, children}) => {
    return (
        <div className={styles.wrapper}>
            <MetaData title={title}/>
            <Breadcrumb/>
            <section className='section-bg sectionClass60'>
                <div className="container bg-white">
                    {children}
                </div>
                <p className={`d-flex justify-content-center align-items-center mt-5 mb-0 ${styles.footer}`}>{title} - 2023-2024, All
                    Rights Reserved</p>
            </section>

        </div>
    );
};

export default Wrapper;