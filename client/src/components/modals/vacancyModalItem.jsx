import React from 'react';
import {Modal, ListGroup, Image} from "react-bootstrap";
import infoIcon from "bootstrap-icons/icons/info-square.svg"
import {observer} from "mobx-react-lite";
import 'react-toastify/dist/ReactToastify.css';


const VacancyModalItem = observer ((props) => {

    return (
        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
        >
            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >
                    <Modal.Title>

                        {props.vacancy.title}

                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <ListGroup>

                        <ListGroup.Item variant="light" className="p-3 d-block">
                            <Modal.Title>Apraksts:</Modal.Title>
                            <p>
                                {props.vacancy.description}
                            </p>
                       </ListGroup.Item>
                        <ListGroup.Item variant="light" className="p-3 justify-content-md-center">
                            <Modal.Title>Darba pieredze:</Modal.Title>
                            <p>
                                {props.vacancy.qualifications}
                            </p>

                        </ListGroup.Item>
                        <ListGroup.Item variant="light" className="p-3 justify-content-md-center">
                            <Modal.Title>Ko mēs piedāvājam:</Modal.Title>
                            <p>
                                {props.vacancy.offer}
                            </p>

                        </ListGroup.Item>
                    </ListGroup>
            </Modal.Body>

<Modal.Footer><Image src={infoIcon} alt={infoIcon} height={30} /></Modal.Footer>

        </Modal>
    );
});

export default VacancyModalItem;