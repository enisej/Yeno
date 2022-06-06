import React, { useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Col, Container, Form, Row, Button} from "react-bootstrap";
import {createResponses} from "../../http/PracticeResponsesAPI";
import jwt_decode from "jwt-decode";
import {useHistory, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import { PROFILE_ROUTE} from "../../utils/consts";
import {GetRequestedVacancyByUserAndTest} from "../../http/RequestedVacanciesAPI";


const PracticeItem = observer(({practices}) => {
    document.body.style.overflow = "hidden"

    const [responseLink, setResponseLink] = useState(null)
    const [requestedVacancyId, setRequestedVacancyId] = useState(null)
    const practiceExerciseId = useParams().id
    const userData = jwt_decode(localStorage.token)
    const userId = userData.id

    const history = useHistory()

    useEffect(() => {
        GetRequestedVacancyByUserAndTest(userData.id, practiceExerciseId).then(data => {
            setRequestedVacancyId(data)
        })
    }, [userData.id, practiceExerciseId])

    const [validated, setValidated] = useState(false);

    const post = async (event) => {
        try{
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            const data = await createResponses(responseLink, userId, practiceExerciseId, requestedVacancyId[0].id)

            if (data) {
                const notify = () => toast.success(data.message);
                notify()
                setTimeout(() => {
                    history.push(PROFILE_ROUTE)
                }, 2000)

            }
        }
    }catch (e){
            const notify = () => toast.warning(e.response.data.message);
            notify()
        }
    }




    return (
        <Container className="">
            <ToastContainer/>
            <Row>
                <Col sm={3}>
                    <Card className="p-3 mt-3 shadow ">
                        <Form className="d-table-row align-items-center" noValidate validated={validated} onSubmit={post}>
                            <Card.Header>
                                Links uz izpildīto testu
                            </Card.Header>
                            <Form.Group controlId="formLink" >
                            <Form.Control
                                type='link'
                                className="mt-3"
                                placeholder="https://www.linkuzatbildi.docs.com"
                                onChange={e=>{setResponseLink(e.target.value)}}
                                value={responseLink}
                                pattern="https://.*" size="30"
                                required
                            >
                            </Form.Control>
                            </Form.Group>
                            <Button className="mt-3" variant="outline-success" type="submit" >Iesniegt</Button>
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