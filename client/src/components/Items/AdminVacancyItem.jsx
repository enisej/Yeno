import React, { useState} from 'react';
import {Badge, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock-fill.svg";
import {observer} from "mobx-react-lite";
import {format, parseISO} from "date-fns";
import VacancyCreateModal from "../modals/vacancyCreateModal";
import {deleteVacancy} from "../../http/vacanciesAPI";
import VacancyUpdateModal from "../modals/vacancyUpdateModal";
import VacancyModalItem from "../modals/vacancyModalItem";







const AdminVacancyItem = observer( ({vacancies}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [vacancy, setVacancy] = useState('');

    const deleteVacancyItem = async (id) => {
        const data = await deleteVacancy(id)
        if(data){
            window.location.reload(false);
        }
    }

    return (
        <Container className="mt-xxl-5">
            <Card className="shadow">
                <Card.Body>
                    <Row>
                        <Col>
                            <Button
                                variant="success"
                                onClick={() => {

                                    setVacancy(vacancy)
                                    setShowCreate(true);
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

                                <Card.Title  className="fs-1 mb-5 " >{vacancy.title}

                                </Card.Title>
                                <Card.Text > <Image src={icon} alt="clock"/> {format(parseISO(vacancy.createdAt), 'yyyy/MM/dd')}</Card.Text>

                            </Col>
                            <Col className="col-lg-3 d-flex mt-3 mb-3 me-lg-5">
                                <Button variant="outline-dark" className="align-self-center shadow m-1"
                                        onClick={() => {

                                            setVacancy(vacancy)
                                            setShowDetails(true);
                                        } } >Apskatīt</Button>
                                <Button
                                    variant="outline-dark"
                                    className="align-self-center shadow m-1"
                                    onClick={() => {
                                        setShowUpdate(true);
                                        setVacancy(vacancy)
                                    } }
                                >Rediģet
                                </Button>
                                <Button
                                    variant="danger"
                                    className="align-self-center shadow m-1"
                                    onClick={e => {deleteVacancyItem(vacancy.id)}}
                                >
                                    Izdzēst
                                </Button>

                            </Col>
                            <Col sm={1}>
                                Status:
                                {vacancy.status === true ?
                                    <Badge className="align-self-center shadow m-1 text-success" pill bg="success">!</Badge>
                                    :
                                    <Badge className="align-self-center shadow m-1 text-danger" pill bg="danger">!</Badge>
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )}

            <VacancyModalItem

                icon = {icon}
                vacancy={vacancy}
                show={showDetails}
                close={() => setShowDetails(false)}/>


            <VacancyCreateModal

                vacancy={vacancy}
                show={showCreate}
                close={() => setShowCreate (false)}/>

            <VacancyUpdateModal
                show={showUpdate}
                vacancy={vacancy}
                close={()=> setShowUpdate(false)}
            />


        </Container>
    );
});

export default AdminVacancyItem;