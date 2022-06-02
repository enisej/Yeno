import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Container, Form, Row, Button} from "react-bootstrap";
import {createResponses} from "../../http/PracticeResponsesAPI";
import jwt_decode from "jwt-decode";
import {useHistory, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import { PROFILE_ROUTE} from "../../utils/consts";

const PracticeItem = observer(({practices}) => {
    document.body.style.overflow = "hidden"

    const [responseLink, setResponseLink] = useState('')
    const practiceExerciseId = useParams().id
    const userData = jwt_decode(localStorage.token)
    const userId = userData.id

    const history = useHistory();

    const post = async () => {
        const data = await createResponses(responseLink, userId, practiceExerciseId)

        if(data){

            const notify = async () => await toast.warning(data.message);
            notify()
            history.push(PROFILE_ROUTE)
        }

    }




    return (
        <Container className="">
            <ToastContainer/>
            <Row>
                <Col sm={3}>
                    <Card className="p-3 mt-3 shadow ">
                        <Form className="d-table-row align-items-center">
                            <Card.Header>
                                Links uz izpildīto testu
                            </Card.Header>
                            <Form.Control
                                className="mt-3"
                                placeholder="www.linkuzatbildi.docs.com"
                                onChange={e=>{setResponseLink(e.target.value)}}
                                value={responseLink}
                            >
                            </Form.Control>
                            <Button className="mt-3" variant="outline-success" onClick={() => {
                                post()

                            }}>Iesniegt</Button>
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