import React, { useContext, useEffect} from 'react';
import { Col, Container, Row} from "react-bootstrap";
import VacancyItem from "../components/Items/vacancyItem";
import {Context} from "../index";
import {fetchAllVacancies, fetchVacancies} from "../http/vacanciesAPI";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import AdminVacancyItem from "../components/Items/AdminVacancyItem";
import Pages from "../components/UI/pages";



const Vacancies = observer(() => {

    const {vacancies} = useContext(Context)


    if(localStorage.token){
        var userData = jwt_decode(localStorage.token)
    }

    if(localStorage.token && userData.status === 'ADMIN'){
        useEffect(() => {
            fetchAllVacancies(vacancies.page, 5).then(data => {
                vacancies.setVacancies(data.rows)
                vacancies.setTotalCount(data.count)
            })
        }, [vacancies.page, vacancies])
    }else{
        useEffect(() => {
            fetchVacancies(vacancies.page, 5).then(data => {
                vacancies.setVacancies(data.rows)
                vacancies.setTotalCount(data.count)
            })
        }, [vacancies.page, vacancies])
    }


    return (
        <Container className="mb-xxl-5">
            {localStorage.token && userData.status === 'ADMIN' ?
            <Row >
                <Col>
                    <AdminVacancyItem vacancies={vacancies}/>
                    <Pages/>
                </Col>
            </Row>
                : <Row >
                    <Col>
                        <VacancyItem vacancies={vacancies}/>
                        <Pages/>
                    </Col>
                </Row>}
        </Container>
    );
});

export default Vacancies;