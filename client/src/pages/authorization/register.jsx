import React, { useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE} from "../../utils/consts";

const Register = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')



    const signup = async () => {
        const data = await registration(email, password, name, surname, birthDate)
        if(data){
            window.location.href=LOGIN_ROUTE;
        }

    }

    return (
            <Container className="mt-1" >

                <Row className="mt-1">
                    <Col lg={5} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className=" text-center ">Reģistrācija</h1>
                            <Form.Group controlId="formFirstname" >
                                <Form.Label>Vārds</Form.Label>
                                <Form.Control
                                    type="firstname"
                                    placeholder="Jānis"
                                    value={name}
                                    onChange={e => setName(e.target.value)}

                                />

                            </Form.Group>
                            <Form.Group controlId="FormSurname" >
                                <Form.Label>Uzvārds</Form.Label>
                                <Form.Control
                                    type="surname"
                                    placeholder="Bērziņš"
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="Date" >
                                <Form.Label>Dzimšanas dati</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="31.12.2000"
                                    value={birthDate}
                                    onChange={e => setBirthDate(e.target.value)}

                                />

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" >
                                <Form.Label>E-pasts</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@yeno.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Parole</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Parole"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />

                            </Form.Group>

                            <Form.Group controlId="formRepeatPassword">
                                <Form.Label>Atkartojiet paroli</Form.Label>
                                <Form.Control type="password" placeholder="Parole" />

                            </Form.Group>

                            <Button className="w-100 mt-3" variant="dark" onClick={signup} >
                                Reģistrēties
                            </Button>
                    </Col>
                </Row>
                <h6 className="mt-5 p-5 text-center text-secondary ">Yeno</h6>
            </Container>
    );
});

export default Register;