import React, { useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {PROFILE_ROUTE} from "../../utils/consts";
import {toast, ToastContainer} from "react-toastify";

const Register = observer(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [tel_number, setTelNumber] = useState('')
    const [cv, setCv] = useState('')
    const [githubLink, setGithubLink] = useState('')
    const [validated, setValidated] = useState(false);

    const signup = async (event) => {
        try {
            event.preventDefault();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            setValidated(true);

            const data = await registration(email, password, name, surname, birthDate, tel_number, cv, githubLink)
            if (data) {
                window.location.href = PROFILE_ROUTE;
            }
        }catch (e){
        const notify = () => toast.warning(e.response.data.message);
        notify()
    }

    }

    return (
            <Container className="mt-2" >
                <ToastContainer/>
                <Form noValidate validated={validated} onSubmit={signup}>
                <Row className="mt-2">
                    <Col lg={5} md={10} sm={12} className="p-3 m-auto shadow rounded-lg bg-light">
                          <h4 className=" text-center ">Reģistrācija</h4>

                            <Form.Group controlId="formFirstname" >
                                <Form.Label>Vārds</Form.Label>
                                <Form.Control
                                    type="firstname"
                                    placeholder="Jānis"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />

                            </Form.Group>
                            <Form.Group controlId="FormSurname" >
                                <Form.Label>Uzvārds</Form.Label>
                                <Form.Control
                                    type="surname"
                                    placeholder="Bērziņš"
                                    value={surname}
                                    onChange={e => setSurname(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="Date" >
                                <Form.Label>Dzimšanas dati</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="31.12.2000"
                                    value={birthDate}
                                    onChange={e => setBirthDate(e.target.value)}
                                    required

                                />

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" >
                                <Form.Label>E-pasts</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="example@yeno.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    />

                            </Form.Group>

                        <Form.Group controlId="formBasicTel_number" >
                            <Form.Label>Telefona numurs</Form.Label>
                            <Form.Control
                                type="TelNumber"
                                placeholder="+371 272 29 293"
                                value={tel_number}
                                onChange={e => setTelNumber(e.target.value)}
                                required
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicCvLink" >
                            <Form.Label>Links uz CV</Form.Label>
                            <Form.Control
                                type="link"
                                placeholder="www.linked.id"
                                value={cv}
                                onChange={e => setCv(e.target.value)}
                                required
                            />

                        </Form.Group>

                            <Form.Group controlId="formBasicLink" >
                                <Form.Label>Github</Form.Label>
                                <Form.Control
                                    type="link"
                                    placeholder="www.github.com/user"
                                    value={githubLink}
                                    onChange={e => setGithubLink(e.target.value)}
                                    required
                                />

                        </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Parole</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Parole"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="on"
                                    required
                                    />

                            </Form.Group>


                            <Form.Group controlId="formRepeatPassword">
                                <Form.Label>Atkartojiet paroli</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Parole"
                                    value={repeatPassword}
                                    onChange={e=>setRepeatPassword(e.target.value)}
                                    autoComplete="on"
                                    required
                                />

                            </Form.Group>

                            <Button className="w-100 mt-3" variant="dark" type="submit" >
                                Reģistrēties
                            </Button>
                    </Col>
                </Row>
                </Form>

                <h6 className="mt-5 p-5 text-center text-secondary ">Yeno</h6>
            </Container>
    );
});

export default Register;