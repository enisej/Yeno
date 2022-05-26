import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {fetchResponsesByTestId} from "../../http/PracticeResponsesAPI";
import {useParams} from "react-router-dom";
import {Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import PracticeFeedbackModal from "../../components/modals/practiceFeedbackModal";


const PracticeResponses = observer(() => {

    const [showFeedbackCreate , setShowFeedbackCreate] = useState(false);
    const [responseId, setResponseId] = useState('');

    const {practiceResponses} = useContext(Context)
    const id = useParams().id



    useEffect(() => {
        let isMounted = true;
        fetchResponsesByTestId(id).then(data => {

            if (isMounted) practiceResponses.setPracticeResponse(data);

        })
        return () => {
            isMounted = false
        };
    }, [practiceResponses, id])

    return (
        <Container className="mb-5">
            {practiceResponses.practiceResponse.map(response =>
                <Card key={response.id} className="p-3 m-3 shadow d-flex align-items-center">
                        <Col sm={8} >
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col><b>Atbildi iesniedza:</b> </Col>
                                        <Col> {response.user.name} {response.user.surname}</Col>
                                    </Row>

                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col><b>E-pasts: </b> </Col>
                                        <Col>{response.user.email}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col><b>Iesniegta atbilde: </b> </Col>
                                        <Col><Button href={response.responseLink} variant="outline-success">Apskatīt</Button></Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col><b>Piezīmes</b> </Col>
                                        <Col>{response.responseDescription}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col><b>Uzdevuma nosaukums </b> </Col>
                                        <Col> <Card.Link href={response.practiceExercise.link}>{response.practiceExercise.title}</Card.Link></Col>
                                    </Row>

                            </ListGroupItem>
                                {response.Feedback === false
                                    ?
                                    <ListGroupItem>
                                        <Row>
                                            <Col><b>Izlikt rezultātus: </b></Col>
                                            <Col><Button variant="dark" onClick={() => {
                                                setShowFeedbackCreate(true)
                                                setResponseId(response.id)
                                            }}>Iesniegt vertējumu</Button></Col>
                                        </Row>
                                    </ListGroupItem>
                                    :
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                <b>Saņemtie punkti</b>
                                            </Col>
                                            <Col>
                                                <Card.Text>{response.RecievedPoints}</Card.Text>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                }
                    </ListGroup>
                        </Col>
                </Card>
            )}

            <PracticeFeedbackModal
                id={responseId}
                show={showFeedbackCreate}
                close={()=> setShowFeedbackCreate(false)}/>
        </Container>
    );
});

export default PracticeResponses;