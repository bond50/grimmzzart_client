import React from 'react';
import classes from './Card.module.css'
import Jumbotron from "../cards/Jumbotron";

const Card = ({cardFooter, children, cardHeader,cardTitleClass, jumbotronTexts,cardHeaderClass, title}) => {
    return (
        <div className={`card ${classes.Card}`}>
            {cardHeader && <div className={`card-header ${classes.CardHeader} ${cardHeaderClass}`}>
                <h3 className={`${classes.CardTitle} ${cardTitleClass}`}>
                    {jumbotronTexts && <Jumbotron text={jumbotronTexts}/>}
                    {title && title}
                </h3>
            </div>}

            <div className={`card-body ${classes.CardBody}`}>
                {children}
            </div>
            {cardFooter && <div className={`card-footer ${classes.CardFooter}`}>
                {cardFooter}
            </div>}
        </div>
    );
};

export default Card;