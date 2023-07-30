import React, {useEffect, useState} from 'react';

import Wrapper from "../../hoc/Wrapper";


const General = ({children, open, cardFooterContent, title, cardBody, showCard, cardHeaderContent}) => {


    return (
        <Wrapper title={title}>
            <div className='row'>
                {showCard && <div className={open ? 'd-none' : 'col-md-3 '}>
                    <div className={`card mb-3`}>
                        {cardHeaderContent && <div className='card-header'>
                            {cardHeaderContent}
                        </div>}
                        {cardBody && <div className="card-body">
                            {cardBody}
                        </div>}
                        {cardFooterContent && <div className='card-footer'>
                            {cardFooterContent}
                        </div>}
                    </div>
                </div>}
                <div className={open || !showCard ? 'col-md-12' : 'col-md-9'}>
                    <div className={'container'}>
                        {children}
                    </div>
                </div>
            </div>
        </Wrapper>

    );
};

export default General;