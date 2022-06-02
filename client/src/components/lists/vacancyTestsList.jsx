import React, {useEffect} from 'react';
import {Card, Col, Container, Row, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {PRACTICE_ROUTE, TEST_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


const VacancyTestsList = observer( ({practices, tests}) => {

    const history = useHistory();


    useEffect(() => {
        const notify = () => toast.info("Jūs pieteicaties vakancei!")
        notify();
    },[])


    return (
        <Container>
            <ToastContainer/>
            <Row>
                <Col>
                    {tests.tests.id
                        ?
            <Card className="mt-3 shadow">
                    <Card.Header>
                            <h4>Teoretiskais tests:</h4>
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
                        :
                        <Card className="p-5 mt-3 shadow"><h2>Tests nav piejams</h2></Card>
                        }
                </Col>
            </Row>
            <Row>
                <Col>
                    {practices.practices.id
                        ?
                        <Card className="mt-5 shadow">
                            <Card.Header>
                                <h4>Praktiskais uzdevums:</h4>
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
                                                onClick={e => {
                                                    history.push(PRACTICE_ROUTE + '/' + practices.practices.id)
                                                }}
                                                variant="dark">
                                                Sākt</Button>
                                    </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                        :
                        <Card className="p-5 mt-3 shadow"><h2>Uzdevums nav piejams</h2></Card>
                    }
                </Col>
            </Row>
        </Container>
    );
})

export default VacancyTestsList;