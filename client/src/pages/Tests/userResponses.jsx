import React, {useContext, useEffect} from 'react';
import {fetchResponsesByUser} from "../../http/PracticeResponsesAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import {Badge, Card, Col, Container, Row} from "react-bootstrap";
import NotFound from "../../components/alerts/NotFound";


const UserResponses = observer(() => {

    const {practiceResponses} = useContext(Context)
    const userData = jwt_decode(localStorage.token)
    const userId = userData.id

    useEffect(() => {
        fetchResponsesByUser(userId).then(data => {practiceResponses.setPracticeResponse(data)

        })

    }, [practiceResponses, userId])

    return (
        <Container>
            {practiceResponses.practiceResponse.length ?

                <div>
                {
                    practiceResponses.practiceResponse.map(responses =>

                        <Card className="mt-5 shadow" key={responses.id}>
                            <Card.Header>
                                {responses.Feedback ?
                                    <Row><Col sm={9}><Badge className="bg-success">Atbilde ir parbaudīta</Badge></Col>
                                        <Col sm={3}>Saņemtie punkti: {responses.RecievedPoints}</Col>

                                    </Row>
                                    :
                                    <Badge className="bg-danger">Atbilde nav parbaudīta</Badge>}
                            </Card.Header>
                            <Card.Body>Uzdevuma nosaukums:<a
                                href={responses.practiceExercise.link}> {responses.practiceExercise.title}</a></Card.Body>
                            <Card.Body>Iesniegta atbilde: <Card.Link
                                href={responses.responseLink}>Atbilde</Card.Link></Card.Body>
                            <Card.Footer>Jūsu komentāri: {responses.responseDescription}</Card.Footer>
                        </Card>
                    )
                }
                </div>
                :
                <NotFound/>
            }
        </Container>
    );
});

export default UserResponses;