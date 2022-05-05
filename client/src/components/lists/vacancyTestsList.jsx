import React from 'react';
import {Card, Col, Container, Row, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {PRACTICE_ROUTE, TEST_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";

const VacancyTestsList = observer( ({practices, tests}) => {

    const history = useHistory();


    return (
        <Container className="">
            <Row>
                <Col>
            <Card className="mt-3 shadow">
                    <Card.Header>
                            <h1>Teoretiskais tests:</h1>
                    </Card.Header>
                <Card.Body>
                    <h4>{tests.tests.title}</h4>
                    <Card.Text>{tests.tests.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Row>
                        <Col sm={11}>
                        </Col>
                        <Col sm={1}>
                        <Button variant="dark"
                                onClick={e => {history.push(TEST_ROUTE + '/' + tests.tests.id )}}>
                            Sākt
                        </Button>
                        </Col>
                    </Row>
                </Card.Footer>

            </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="mt-5 shadow">
                        <Card.Header>
                            <h1>Praktiskais uzdevums:</h1>
                        </Card.Header>
                        <Card.Body>
                            <h4>{practices.practices.title}</h4>
                            <Card.Text>{practices.practices.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col sm={11}>
                                </Col>
                                <Col sm={1}>
                                    <Button
                                        onClick={e => {history.push(PRACTICE_ROUTE + '/' + practices.practices.id )}}
                                        variant="dark">
                                        Sākt</Button>
                                </Col>
                            </Row>
                        </Card.Footer>

                    </Card>
                </Col>
            </Row>
        </Container>
    );
})

export default VacancyTestsList;