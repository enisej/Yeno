import React, { useContext, useEffect} from 'react';
import { Col, Container, Row} from "react-bootstrap";
import VacancyItem from "../components/Items/vacancyItem";
import {Context} from "../index";
import {fetchVacancies} from "../http/vacanciesAPI";
import {observer} from "mobx-react-lite";



const Vacancies = observer(() => {

    const {vacancies} = useContext(Context)

        useEffect(() => {

            fetchVacancies().then(data => {
                vacancies.setVacancies(data.rows)
            })
        }, [vacancies])

    return (
        <Container>
            <Row >
                <Col>
                    <VacancyItem vacancies={vacancies}/>
                </Col>
            </Row>
        </Container>
    );
});

export default Vacancies;