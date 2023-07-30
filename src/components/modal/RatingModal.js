import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Icon} from '@iconify/react';
import classes from './Modal.module.css'

const RatingModal = ({children, show, user, handleStarSubmit, modalTitle, handleShow, handleClose}) => {


    return (
        <button className={`btn btn-primary ${classes.Btn}`}>
            <div onClick={handleShow}>
                <Icon
                    icon={user?'material-symbols:rate-review-outline':'material-symbols:login'}
                    fontSize={18}/>

                {user ? ' Submit Your Review' : ' Login to rate'}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button className={classes.Btn}
                        variant="primary"
                        onClick={handleStarSubmit}>
                      Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </button>
    );
};

export default RatingModal