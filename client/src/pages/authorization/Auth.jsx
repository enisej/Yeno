import React, {useContext, useState} from 'react';
import {Col, Container, Form, Row, Button, Card} from "react-bootstrap";
import {HOME_ROUTE, REGISTER_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {login} from "../../http/userAPI";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false);
    const history = useHistory()


    const signIn = async (event) => {
        try{
            event.preventDefault();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            setValidated(true);

            const data = await login(email, password)
        if (data) {
            user.setUser(data)
            user.setIsAuth(true)
            history.push(HOME_ROUTE)
        }
        }catch (e){
            const notify = () => toast.warning(e.response.data.message);
            notify()
        }
    }



    return (

            <Container className="mt-1 d-flex flex-column min-vh-100" >
                <ToastContainer/>
                <Form noValidate validated={validated} onSubmit={signIn}>
                    <Row >
                        <Col lg={5} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg bg-light">

                            <h1 className=" text-center ">Pieslēgšana</h1>
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

                                <Form.Group controlId="formBasicPassword" >
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

                                <Button className="w-100 mt-3" variant="dark" type="submit">
                                    Ieiet
                                </Button>
                            <p className="d-flex justify-content-center mt-3">Nav konta? <Card.Link href={REGISTER_ROUTE}>Rēģistēties</Card.Link></p>
                        </Col>
                    </Row>
                </Form>
            </Container>
    );
});
export default Auth;