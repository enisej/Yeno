import React from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Container, Form, Row, Button} from "react-bootstrap";

const PracticeItem = observer(({practices}) => {
    document.body.style.overflow = "hidden"
    return (
        <Container className="">
            <Row>
                <Col sm={3}>
                    <Card className="p-3 mt-3 shadow ">
                        <Form className="d-table-row align-items-center">
                            <Card.Header>
                                Links uz izpildīto testu
                            </Card.Header>
                            <Form.Control className="mt-3" placeholder="www.linkuzatbildi.docs.com">
                            </Form.Control>
                            <Button className="mt-3" variant="outline-success">Iesniegt</Button>
                        </Form>
                    </Card>
                </Col>
                <Col >
            <iframe
                style={{background:"white"}}
                className="shadow border-dark"
                width="100%"
                height={window.innerHeight}
                title={practices.practices.link}
                src={practices.practices.link}>
            </iframe>
                </Col>
            </Row>
        </Container>
    );
});

export default PracticeItem;