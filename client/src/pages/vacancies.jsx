import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import VacancyItem from "../components/Items/vacancyItem";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import AdminVacancyItem from "../components/Items/AdminVacancyItem";
import Pages from "../components/UI/pages";



const Vacancies = observer(() => {

    if(localStorage.token){
        var userData = jwt_decode(localStorage.token)
    }

    return (
        <Container className="mb-xxl-5 d-flex flex-column min-vh-100">
            {localStorage.token && userData.status === 'ADMIN'
                ?
            <Row>
                <Col>
                    <AdminVacancyItem/>
                    <Pages/>
                </Col>
            </Row>
                : <Row >
                    <Col>
                        <VacancyItem />
                        <Pages />
                    </Col>
                </Row>}
        </Container>
    );
});

export default Vacancies;