import React, {useContext, useState} from 'react';
import {Col, Container, Form, Row, Button} from "react-bootstrap";
import {HOME_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {login} from "../../http/userAPI";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()


    const signIn = async () => {
        try{
            const data = await login(email, password)

        if (data) {
            user.setUser(user)
            user.setIsAuth(true)
            history.push(HOME_ROUTE)

        }
        }catch (e){
            alert(e.response.data.message)
        }
    }



    return (
            <Container className="mt-1" >

                <Row >
                    <Col lg={5} md={10} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <h1 className=" text-center ">Pieslēgšana</h1>
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

                            <Button className="w-100 mt-3" variant="dark" onClick={signIn}>
                                Ieiet
                            </Button>
                    </Col>
                </Row>
            </Container>
    );
});
export default Auth;