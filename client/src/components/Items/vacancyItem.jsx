import React, {useState} from 'react';
import {Card, Col, Container, Image, Row, Button} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock-fill.svg";
import VacancyModalItem from "../modals/vacancyModalItem";
import {ALL_TEST_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {format, parseISO} from "date-fns";
import {AddRequestedVacancy} from "../../http/RequestedVacanciesAPI";
import jwt_decode from "jwt-decode";

const VacancyItem = observer( ({vacancies}) => {

    const [show, setShow] = useState(false);
    const [vacancy, setVacancy] = useState('');

    const history = useHistory();




    const requestVacancy = async (vacancyId) => {
        const userData = jwt_decode(localStorage.token)
        const data = await AddRequestedVacancy(vacancyId, userData.id)

        if(data){
            alert(data.message)
        }
    }



    return (
        <Container  >
            {vacancies.vacancies.map(vacancy =>

            <Card  className="mt-5 shadow" key={vacancy.id} >

                <Card.Body  >
                    <Row className="justify-content-md-center">
                        <Col sm>
                                    <Card.Title  className="fs-1 mb-5 " >{vacancy.title} </Card.Title>
                                    <Card.Text > <Image src={icon} alt="clock"/> {format(parseISO(vacancy.createdAt), 'yyyy/MM/dd')}</Card.Text>

                        </Col>
                        <Col className="col-lg-3 d-flex mt-3 mb-3 me-lg-5">
                        <Button variant="outline-dark" className="align-self-center shadow m-1"
                                onClick={() => {

                                    setVacancy(vacancy)
                                    setShow(true);
                                } } >Apskatīt</Button>
                            <Button
                                variant="outline-success"
                                className="align-self-center shadow m-1"

                                onClick={e => {
                                    history.push(ALL_TEST_ROUTE + '/' + vacancy.theoryTestId + '/' + vacancy.practiceExerciseId)
                                    requestVacancy(vacancy.id)
                                }}
                                >
                                Pieteikties
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
           )}
            <VacancyModalItem

                icon = {icon}
                vacancy={vacancy}
                show={show}
                close={() => setShow (false)}/>
        </Container>
    );
});

export default VacancyItem;