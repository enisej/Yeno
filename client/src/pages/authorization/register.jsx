import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Register = () => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }


        setValidated(true);
    };

    return (
            <Container className="mt-1">

                <Row className="mt-1">
                    <Col lg={5} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className=" text-center ">Reģistrācija</h1>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>

                            <Form.Group controlId="formFirstname" >
                                <Form.Label>Vārds</Form.Label>
                                <Form.Control type="firstname" placeholder="Jānis"   required/>
                                <Form.Control.Feedback type="invalid">
                                    Vārds ir nepraizi ievadīts!
                                </Form.Control.Feedback>

                            </Form.Group>
                            <Form.Group controlId="FormSurname" >
                                <Form.Label>Vārds</Form.Label>
                                <Form.Control type="surname" placeholder="Bērziņš"   required/>
                                <Form.Control.Feedback type="invalid">
                                    Uzvārds ir nepraizi ievadīts!
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group controlId="Date" >
                                <Form.Label>Dzimšanas dati</Form.Label>
                                <Form.Control type="date" required/>
                                <Form.Control.Feedback type="invalid">
                                    Dzimšanas datums ir ievadīts nepareizi!
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" >
                                <Form.Label>E-pasts</Form.Label>
                                <Form.Control type="email" placeholder="example@yeno.com"   required/>
                                <Form.Control.Feedback type="invalid">
                                    E-pasts ir nepraizi ievadīts!
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Parole</Form.Label>
                                <Form.Control type="password" placeholder="Parole" required/>
                                <Form.Control.Feedback type="invalid">
                                    Parolee ir ievadīta nepareizi!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formRepeatPassword">
                                <Form.Label>Atkartojiet paroli</Form.Label>
                                <Form.Control type="password" placeholder="Parole" required/>
                                <Form.Control.Feedback type="invalid">
                                    Parole ir atkartota nepareizi!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button className="w-100 mt-3" variant="dark" type="submit">
                                Reģistrēties
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <h6 className="mt-5 p-5 text-center text-secondary ">Yeno</h6>
            </Container>
    );
};

export default Register;