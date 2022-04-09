import React from 'react';
import { Col, Container, Row} from "react-bootstrap";
import VacancyItem from "../components/Items/vacancyItem";


const Vacancies = () => {

    return (
        <Container>
            <Row >
                <Col>
                    <VacancyItem/>
                </Col>
            </Row>
        </Container>
    );
};

export default Vacancies;