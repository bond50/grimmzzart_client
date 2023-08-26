import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - ${process.env.REACT_APP_APPNAME}`}</title>
        </Helmet>
    )
}

export default MetaData
