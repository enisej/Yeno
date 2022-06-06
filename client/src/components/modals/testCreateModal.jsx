import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createTest} from "../../http/testAPI";
import {toast, ToastContainer} from "react-toastify";
import {Context} from "../../index";

const TestCreateModal = observer((props) => {

    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [responseLink, setResponseLink] = useState('')
    const {tests} = useContext(Context)
    const [validated, setValidated] = useState(false)

    const post = async (event) => {

        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {


            const data = await createTest(title, link, description, responseLink)
            if (data) {
                tests.setTheoryTests(data)
                const notify = () => toast.success(data.message);
                notify()
                setDescription('')
                setResponseLink('')
                setLink('')
                setTitle('')
                props.close()
            }
        }
    }

    return (
        <ToastContainer/>,
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

                    <Form.Group controlId="ResponseLink" className="mb-3">
                        <Form.Label>Links uz iesniegtam atbildem</Form.Label>
                        <Form.Control
                            placeholder="Links"
                            value={responseLink}
                            onChange={e => setResponseLink(e.target.value)}
                            pattern="https://.*" size="30"
                            required
                        />

                    </Form.Group>

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
                    <Button variant="dark" className="shadow" type='submit'>Publicēt</Button>
                </Row>
                </Form>

            </Modal.Body>


        </Modal>
    );
});

export default TestCreateModal;