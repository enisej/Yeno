import React, {useState} from 'react';
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {updatePassword} from "../../http/userAPI";
import {toast, ToastContainer} from "react-toastify";
const PasswordChangeModal = observer((props) => {

    const [password, setPasswordChange] = useState('')
    const [validated, setValidated] = useState(false)
    const id = props.userId

    const changePass = async (event) => {
        try {
            event.preventDefault();
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            setValidated(true);
            if (form.checkValidity()) {
                const data = await updatePassword(id, password)
                if (data) {
                    const notify = () => toast.success(data.message, {position: toast.POSITION.TOP_CENTER});
                    notify()
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000)
                }
            }
        }catch (e)
            {
                const notify = () => toast.warning(e.response.data.message, {position: toast.POSITION.TOP_CENTER})
                notify()
            }
        }
    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ToastContainer/>
            <Modal.Header closeButton onClick={props.close} className="p-4"><h4>Paroles rediģēšana</h4></Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={changePass}>
                    <FormGroup controlId="password">
                    <FormLabel>Ievadiet jauno paroli</FormLabel>
                    <FormControl type='password'
                                 value={password}
                                 onChange={e=>{setPasswordChange(e.target.value)}}
                                 pattern=".{6,16}"
                                 required>
                    </FormControl>

                    </FormGroup>
                    <Row >
                    <Col className="d-flex justify-content-center"><Button variant="success" className="mt-3" type="submit">Saglabāt izmaiņas</Button></Col>
                    </Row>

                </Form>
            </Modal.Body>


        </Modal>
    );
});

export default PasswordChangeModal;