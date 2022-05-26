import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {deleteRequestedVacancy, GetRequestedVacancy} from "../http/RequestedVacanciesAPI";
import {Context} from "../index";
import jwt_decode from "jwt-decode";
import {ALL_TEST_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import {format, parseISO} from "date-fns";
import NotFound from "../components/alerts/NotFound";

const RequestedVacanciesPage = observer(() => {

    const {requestedVacancies} = useContext(Context)
    const userData = jwt_decode(localStorage.token)
    const history = useHistory()

    useEffect(() => {
        GetRequestedVacancy(userData.id).then(data => {
            requestedVacancies.setRequestedVacancies(data)
        })
    }, [requestedVacancies, userData.id])


    const deleteReqVacancy = async (id) => {
        const data = await deleteRequestedVacancy(id)
        if(data){
            window.location.reload(false);
        }
    }

    return (
        <Container className="mb-xxl-5">
            {requestedVacancies.RequestVacancies.length
                ?
                <div>
                    {requestedVacancies.RequestVacancies.map(request =>
                        <Card className="mt-5 shadow" key={request.id}>
                            <Row>
                                <Col sm={8}>
                                    <Card.Body><b>Nosaukums:</b> {request.vacancy.title}</Card.Body>
                                    <Card.Body> <b>Vakance
                                        pievienota:</b> {format(parseISO(request.createdAt), 'yyyy/MM/dd')}</Card.Body>
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        variant="outline-success"
                                        className="shadow m-4"

                                        onClick={e => {
                                            history.push(ALL_TEST_ROUTE + '/' + request.vacancy.theoryTestId + '/' + request.vacancy.practiceExerciseId)
                                        }}
                                    >
                                        Testi
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="shadow m-4"
                                        onClick={e => {
                                            deleteReqVacancy(request.id)
                                        }}>
                                        Izdzēst
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </div>
                :
                <NotFound/>
            }
        </Container>
    );
});

export default RequestedVacanciesPage;