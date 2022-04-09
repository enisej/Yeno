import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Card, Col, Container, Image, Row, Button} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock-fill.svg";
import VacancyModalItem from "./vacancyModalItem";






const VacancyItem = observer(() => {
    const {vacancies} = useContext(Context)

    const [show, setShow] = useState(false);
    const [vacancy, setVacancy] = useState('');


    return (
        <Container  >
            {vacancies.vacancies.map(vacancy =>
            <Card  className="mt-5" key={vacancy.id} >

                <Card.Body  >
                    <Row className="justify-content-md-center">
                        <Col sm>
                                    <Card.Title  className="fs-1 mb-5 " >{vacancy.title} </Card.Title>
                                    <Card.Text > <Image src={icon} alt="clock"/> {vacancy.createdAt}</Card.Text>

                        </Col>
                        <Col className="col-sm-2 d-flex mt-3 mb-3 me-3">
                        <Button variant="dark" className="align-self-center shadow"
                                onClick={() => {
                                    setVacancy(vacancy)
                                    setShow(true);
                                } } >Apskatīt</Button>

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