import React, { useState} from 'react';
import {observer} from "mobx-react-lite";
import {Modal, Form, Button, Alert} from "react-bootstrap";
import { updateUser} from "../../http/userAPI";
import jwt_decode from "jwt-decode";

import {toast} from "react-toastify";





const UserUpdateModal = observer((props) => {

    const id = jwt_decode(localStorage.token).id



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [tel_number, setTelNumber] = useState('')
    const [cv, setCv] = useState('')
    const [githubLink, setGithub] = useState('')

    const [validated, setValidated] = useState(false)

    const update = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity()) {
            const data = await updateUser(id, name, surname, email, tel_number, birthDate, cv, githubLink)

            if (data) {
                const notify = () => toast.success(data.message, {position: toast.POSITION.TOP_CENTER});
                notify()
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            }
        }
    }


    return (
        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               onShow={e=>{
                   setName(props.user.name)
                   setSurname(props.user.surname)
                   setEmail(props.user.email)
                   setBirthDate(props.user.birthDate)
                   setCv(props.user.cv)
                   setGithub(props.user.githubLink)
                   setTelNumber(props.user.tel_number)
               }}
        >

            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >
                <h4 className=" text-center ">Profila rediģēšana</h4>
            </Modal.Header>
            <Modal.Body>
                 <Alert variant="warning"><i className='bi-exclamation-circle-fill'></i> Uzmanību! Pēc izmaiņu saglabāšanas jums vēlreiz būs jāiziet cauri pieslēgsanas formu!</Alert>
            </Modal.Body>
            <Form noValidate validated={validated} onSubmit={update}>
            <Modal.Body>
                <Form.Group controlId="formFirstname" >
                    <Form.Label>Vārds</Form.Label>
                    <Form.Control
                        type="firstname"
                        placeholder="Jānis"
                        value={name}
                        onChange={event => {setName(event.target.value)}}
                        pattern='.{3,16}'
                        required
                    />
                    <Form.Group controlId="FormSurname" >
                        <Form.Label>Uzvārds</Form.Label>
                        <Form.Control
                            type="surname"
                            placeholder="Bērziņš"
                            value={surname}
                            onChange={event => {setSurname(event.target.value)}}
                            pattern='.{3,16}'
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="Date" >
                        <Form.Label>Dzimšanas dati</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="31.12.2000"
                            value={birthDate}
                            onChange={event => {setBirthDate(event.target.value)}}
                            required
                        />

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" >
                        <Form.Label>E-pasts</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@yeno.com"
                            value={email}
                            onChange={event => {setEmail(event.target.value)}}
                            required
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicTel_number" >
                        <Form.Label>Telefona numurs</Form.Label>
                        <Form.Control
                            type="TelNumber"
                            placeholder="+371 272 29 293"
                            value={tel_number}
                            onChange={event => {setTelNumber(event.target.value)}}
                            pattern='[0-9]{8,16}'
                            required
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicCvLink" >
                        <Form.Label>Links uz CV</Form.Label>
                        <Form.Control
                            type="link"
                            placeholder="www.linked.id"
                            value={cv}
                            onChange={event => {setCv(event.target.value)}}
                            pattern="https://.*" size="30"
                            required
                        />

                    </Form.Group>

                    <Form.Group controlId="formBasicLink" >
                        <Form.Label>Github</Form.Label>
                        <Form.Control
                            type="link"
                            placeholder="www.github.com/user"
                            value={githubLink}
                            onChange={event => {setGithub(event.target.value)}}
                            pattern="https://.*" size="30"
                            required
                        />

                    </Form.Group>
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" type='submit'>Saglabāt izmaiņas</Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );
});

export default UserUpdateModal;