import React from 'react';
import {Modal, Button, ListGroup, Col, Image} from "react-bootstrap";
import infoIcon from "bootstrap-icons/icons/info-square.svg"



const VacancyModalItem =  (props) => {
    return (
        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered >
            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >
                    <Modal.Title>

                        {props.vacancy.title}

                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <ListGroup>
                        <ListGroup.Item variant="light" className="p-3 justify-content-md-center">

                            <p >
                                {props.vacancy.description}
                            </p>

                       </ListGroup.Item>

                    </ListGroup>

            </Modal.Body>
            <Col className="align-self-center mb-3">
                <Button variant="success">Pieteikties</Button>
            </Col>
<Modal.Footer><Image src={infoIcon} alt={infoIcon} height={30} /></Modal.Footer>

        </Modal>
    );
};

export default VacancyModalItem;