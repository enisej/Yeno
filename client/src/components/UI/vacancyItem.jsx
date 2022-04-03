import React from 'react';
import {Card, Container, Col, Row, Image} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock.svg"


//card value
const value = "something"

const VacancyItem = () => {

    return (
        <div >
            <Container className="p-5">

            <Card >

                <Card.Body >
                    <Row className="justify-content-md-center">
                    <Col sm>
                        <Card.Title className="fs-1 mb-5">{value} </Card.Title>
                        <Card.Text > <Image src={icon} alt="clock"/> {value}</Card.Text>
                    </Col>

                    </Row>
                </Card.Body>
            </Card>



            </Container>

        </div>
    );
};

export default VacancyItem;