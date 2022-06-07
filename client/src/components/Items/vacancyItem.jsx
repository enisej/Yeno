import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Image, Row, Button, FormControl} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock-fill.svg";
import VacancyModalItem from "../modals/vacancyModalItem";
import {ALL_TEST_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {format, parseISO} from "date-fns";
import {AddRequestedVacancy} from "../../http/RequestedVacanciesAPI";
import jwt_decode from "jwt-decode";
import {Context} from "../../index";
import {
    fetchVacancies,
} from "../../http/vacanciesAPI";
import NotFound from "../alerts/NotFound";



const VacancyItem = observer( () => {

    const [show, setShow] = useState(false);
    const [vacancy, setVacancy] = useState('');

    const history = useHistory();
    const {vacancies} = useContext(Context)


    const requestVacancy = async (vacancyId) => {
        const userData = jwt_decode(localStorage.token)
        const data = await AddRequestedVacancy(vacancyId, userData.id)
        if(data){}
    }

    const [rowData, setRowData ] = useState('')

    useEffect(() => {
        fetchVacancies(vacancies.page, 5).then(data => {
            vacancies.setTotalCount(data.count)
            setRowData(data.rows);

        })
    }, [vacancies.vacancies,vacancies.page, vacancies])

    const [title, setTitle] = useState('')

    if (title === '') {
        fetchVacancies(vacancies.page, 5).then(data => {
            vacancies.setTotalCount(data.count);
            return setRowData(data.rows);})
    }

    const Search = () => {
        if (title === '') {
            fetchVacancies(vacancies.page, 5).then(data => {
                vacancies.setTotalCount(data.count);
                return setRowData(data.rows);})
        } else {
            const filtered = rowData.filter(obj => {
                return obj.title.toLowerCase() === title.toLowerCase();
            });
            setRowData(filtered)
        }
    }

    return (
        <Container className='mt-4'>
            <Card className="shadow">
                <Card.Body>
                    <Row>
                        <Col >
                            <Row>
                                <Col sm={6}>

                                </Col>
                                <Col>
                                    <FormControl
                                        type="search"
                                        placeholder="Meklēt pēc nosaukuma..."
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={e => {
                                            setTitle(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col sm={1}><Button variant="outline-success" onClick={Search}><i className="bi-search"></i></Button></Col>

                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {rowData.length ?
                <div>
                    {rowData.map(vacancy =>
                        <Card className="mt-4 shadow" key={vacancy.id}>
                            <Card.Body>
                                <Row className="justify-content-md-center">
                                    <Col sm>
                                        <Card.Title className="fs-1 mb-5 ">{vacancy.title} </Card.Title>
                                        <Card.Text> <Image src={icon}
                                                           alt="clock"/> {format(parseISO(vacancy.createdAt), 'yyyy/MM/dd')}
                                        </Card.Text>

                                    </Col>
                                    <Col className="col-lg-3 d-flex mt-3 mb-3 me-lg-5">
                                        <Button variant="outline-dark" className="align-self-center shadow m-1"
                                                onClick={() => {

                                                    setVacancy(vacancy)
                                                    setShow(true);
                                                }}>Apskatīt</Button>
                                        <Button
                                            variant="outline-success"
                                            className="align-self-center shadow m-1"

                                            onClick={e => {
                                                requestVacancy(vacancy.id)
                                                history.push(ALL_TEST_ROUTE + '/' + vacancy.theoryTestId + '/' + vacancy.practiceExerciseId)


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

                        icon={icon}
                        vacancy={vacancy}
                        show={show}
                        close={() => setShow(false)}/>
                </div>
                :<NotFound/>
            }
        </Container>
    );
});

export default VacancyItem;