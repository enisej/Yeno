import React from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import logo from "../../images/bg.jpg"

const GoalCardInfo = () => {
    return (
        <Card className="mt-5 shadow">
            <Row>
                <Col className="p-4 d-flex justify-content-center" style={{background: ""}}>
                    <Image src={logo} className="shadow rounded-circle" height="auto" width="400"/>
                </Col>
                <Col className="p-4 " style={{background: ""}}>
                    <h1 className="fw-bold mb-4">Projekta galvenais mērķis</h1>
                    <h4>Testēt iespējamo darbinieku zināšanas un piedāvāt jaunākas vakances uzņēmuma.</h4>
                    <h4>Veidot jaunus testus un vakances vissērtāka veida izmantojot integrētu risinājumu google forms.</h4>

                </Col>
            </Row>
        </Card>
    );
};

export default GoalCardInfo;