import React, {useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {updatePractice} from "../../http/practiceAPI";

const PracticeUpdateModal = observer((props) => {

    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const update = async () => {
        const id = props.practice.id
        const data = await updatePractice(id ,title, link, description)
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
                setTitle(props.practice.title)
                setLink(props.practice.link)
                setDescription(props.practice.description)
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

export default PracticeUpdateModal;