import React from "react";
import { Box } from "../elements";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Logout({ data }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Box className="mc-sidebar-logout text-center" >
            <>
                <Button onClick={handleShow} >

                    Logout
                </Button>

                <Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton  style={{marginRight:"15px", marginTop:"15px" }}>
                  
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to logout!</Modal.Body>
                    <Modal.Footer>
                        <Button  variant="secondary"  href="/" style={{marginBottom:"20px"}}>
                            Yes
                        </Button>
                        <Button variant="primary"  onClick={handleClose} style={{marginBottom:"20px"}}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Box>

    )
}






