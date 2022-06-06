import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createPracticeTest} from "../../http/practiceAPI";
import {toast} from "react-toastify";
import {Context} from "../../index";

const PracticeCreateModal = observer((props) => {

    const {practices} = useContext(Context)

    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [validated, setValidated] = useState(false)

    const post = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {
            const data = await createPracticeTest(title, link, description)
            if (data) {
                practices.setPracticeTest(data)
                const notify = () => toast.success(data.message);
                notify()
                setDescription('')
                setLink('')
                setTitle('')
                props.close()
            }
        }
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={props.close} className="p-4"><h4>Testa pievienošana</h4></Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={post}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Nosakumus</Form.Label>
                    <Form.Control
                        placeholder="Nosaukums"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group controlId="link" className="mb-3">
                    <Form.Label>Links</Form.Label>
                    <Form.Control
                        placeholder="Links"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        pattern="https://.*" size="30"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Apraksts</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Apraksts"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />

                </Form.Group>

                <Row  className="mt-4" >
                    <Button variant="dark" className="shadow" type='submit' onClick={e=>{
                        }}>Publicēt</Button>
                </Row>
                    </Form>
            </Modal.Body>


        </Modal>
    );
});

export default PracticeCreateModal;