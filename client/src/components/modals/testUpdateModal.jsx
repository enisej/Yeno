import React, {useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {updateTest} from "../../http/testAPI";

const TestUpdateModal = observer((props) => {

    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [responseLink, setResponseLink] = useState('')

    const update = async () => {
        const id = props.test.id
        const data = await updateTest(id ,title, link, description, responseLink)
        if(data){
            window.location.reload(false);
        }

    }


    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onShow={()=>{
                setTitle(props.test.title)
                setLink(props.test.link)
                setDescription(props.test.description)
                setResponseLink(props.test.responseLink)
            }}
        >
            <Modal.Header closeButton onClick={props.close} className="p-4"><h4>Testa pievienošana</h4></Modal.Header>
            <Modal.Body>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Nosakumus</Form.Label>
                    <Form.Control
                        placeholder="Nosaukums"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                </Form.Group>

                <Form.Group controlId="link" className="mb-3">
                    <Form.Label>Links</Form.Label>
                    <Form.Control
                        placeholder="Links"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                    />

                    <Form.Group controlId="ResponseLink" className="mb-3">
                        <Form.Label>Links uz atbildem</Form.Label>
                        <Form.Control
                            placeholder="Links"
                            value={responseLink}
                            onChange={e => setResponseLink(e.target.value)}
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
                    />

                </Form.Group>

                <Row  className="mt-4" >
                    <Button variant="dark" className="shadow" onClick={update}>Saglabāt izmaiņas</Button>
                </Row>

            </Modal.Body>


        </Modal>
    );
});

export default TestUpdateModal;