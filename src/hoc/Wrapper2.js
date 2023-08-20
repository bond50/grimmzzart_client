import React from 'react';
import MetaData from "../common/helmet/MetaData";
import Breadcrumb from "../components/BreadCrump/BreadCrump";


const Wrapper2 = ({title, children}) => {
    return (
        <>
            <MetaData title={title}/>
            <Breadcrumb/>
            {children}
        </>
    );
};

export default Wrapper2;