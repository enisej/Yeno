import React, {useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock-fill.svg";
import {observer} from "mobx-react-lite";
import {format, parseISO} from "date-fns";
import {ALL_TEST_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";
import VacancyCreateModal from "../modals/vacancyCreateModal";







const AdminVacancyItem = observer( ({vacancies}) => {

    const [show, setShow] = useState(false);
    const [vacancy, setVacancy] = useState('');
    const history = useHistory();

    return (
        <Container className="mt-xxl-5">
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Button
                                variant="success"
                                onClick={() => {

                                    setVacancy(vacancy)
                                    setShow(true);
                                } }
                            >Izveidot vakanci
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

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
                                         >Rediģēt</Button>
                                <Button
                                    variant="danger"
                                    className="align-self-center shadow m-1"
                                    onClick={e => {history.push(ALL_TEST_ROUTE + '/' + vacancy.theoryTestId + '/' + vacancy.practiceExerciseId)}}
                                >
                                    Izdzēst
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}

            <VacancyCreateModal
                icon = {icon}
                vacancy={vacancy}
                show={show}
                close={() => setShow (false)}/>

        </Container>
    );
});

export default AdminVacancyItem;