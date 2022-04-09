import React, {useState} from 'react';
import {Col, Container, Form, Row, Button} from "react-bootstrap";


const Auth = () => {

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
            <Container className="mt-1" >

                <Row >
                    <Col lg={5} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className=" text-center ">Pieslēgšana</h1>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                                    Parole ir ievadīta nepareizi!
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button className="w-100 mt-3" variant="dark" type="submit">
                                Ieiet
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
    );
};
export default Auth;