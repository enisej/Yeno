import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Modal, Form, Button} from "react-bootstrap";
import {getUser, updateUser} from "../../http/userAPI";
import {HOME_ROUTE} from "../../utils/consts";
import jwt_decode from "jwt-decode";
import {Context} from "../../index";





const UserUpdateModal = observer((props) => {




    const {user} = useContext(Context)
    const id = jwt_decode(localStorage.token).id
    const [userData, setUserData] = useState([])

    useEffect(() => {

        getUser(id).then(data => { user.setUser(data)
            setUserData(data)
        })
    }, [user, id])

    const update = async () => {
        const user_id = jwt_decode(localStorage.token)
        var id = user_id.id
        const data = await updateUser(id, userData.email, userData.password, userData.name, userData.surname, userData.birthDate, userData.tel_number, userData.cv , userData.githubLink, userData.status)

        if(data){
            window.location.href=HOME_ROUTE;
        }
    }


    return (
        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered>

            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >
                <h4 className=" text-center ">Profila rediģēšana</h4>
            </Modal.Header>
            <Modal.Body>

                <Form.Group controlId="formFirstname" >
                    <Form.Label>Vārds</Form.Label>
                    <Form.Control
                        type="firstname"
                        placeholder="Jānis"
                        defaultValue={userData.name}
                    />
                    <Form.Group controlId="FormSurname" >
                        <Form.Label>Uzvārds</Form.Label>
                        <Form.Control
                            type="surname"
                            placeholder="Bērziņš"
                            defaultValue={userData.surname}
                        />
                    </Form.Group>

                    <Form.Group controlId="Date" >
                        <Form.Label>Dzimšanas dati</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="31.12.2000"
                            defaultValue={userData.birthDate}
                        />

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>E-pasts</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@yeno.com"
                            defaultValue={userData.email}
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicTel_number" >
                        <Form.Label>Telefona numurs</Form.Label>
                        <Form.Control
                            type="TelNumber"
                            placeholder="+371 272 29 293"
                            defaultValue={userData.tel_number}
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicCvLink" >
                        <Form.Label>Links uz CV</Form.Label>
                        <Form.Control
                            type="link"
                            placeholder="www.linked.id"
                            defaultValue={userData.cv}
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicLink" >
                        <Form.Label>Github</Form.Label>
                        <Form.Control
                            type="link"
                            placeholder="www.github.com/user"
                            defaultValue={userData.githubLink}
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Parole</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Parole"
                            defaultValue={userData.password}
                        />

                    </Form.Group>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={update}>Saglabāt</Button>
            </Modal.Footer>

        </Modal>
    );
});

export default UserUpdateModal;