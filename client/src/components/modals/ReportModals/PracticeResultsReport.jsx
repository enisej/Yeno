import React, {useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, ListGroup, ListGroupItem, Modal, Row} from "react-bootstrap";
import {useReactToPrint} from "react-to-print";

const PracticeResultsReport = observer((props) => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >

            </Modal.Header>
            <Modal.Body ref={componentRef}>
                <h4 className="d-flex justify-content-center">Praktiskā uzdevuma rezultāti</h4>
                <ListGroup >
                    <ListGroupItem>
                        <Row>
                            <Col><b>Atbildi iesniedza</b> </Col>
                            <Col> {props.name} {props.surname}</Col>

                        </Row>
                    </ListGroupItem >
                    <ListGroupItem >
                        <Row>
                            <Col><b>E-pasts </b> </Col>
                            <Col>{props.email}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>Vakance </b> </Col>
                            <Col>{props.vacancy}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>Uzdevuma izpildes laiks</b> </Col>
                            <Col>{props.date}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>Uzdevuma nosaukums</b> </Col>
                            <Col> <Card.Link>{props.title}</Card.Link></Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="secondary" onClick={handlePrint}>
                    <i className="bi-printer"></i>
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default PracticeResultsReport;