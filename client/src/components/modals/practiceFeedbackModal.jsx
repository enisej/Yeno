import React, {useState} from 'react';
import { Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {sendFeedback} from "../../http/PracticeResponsesAPI";

const PracticeFeedbackModal = observer((props) => {


    const [recievedPoints, setRecievedPoints] = useState('');
    const [responseDescription, setResponseDescription] = useState('');

    const postFeedback = async () => {
        const feedback = true
        const id = props.id
        const data = await sendFeedback(id, recievedPoints, feedback, responseDescription)
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
        >
            <Modal.Header closeButton onClick={props.close} className="p-4"><h4>Vertējumu iesniegšana</h4></Modal.Header>
            <Modal.Body>
                <Form.Group controlId="points" className="mb-3">
                    <Form.Label>Punkti</Form.Label>
                    <Form.Control
                        placeholder="Punkti"
                        value={recievedPoints}
                        onChange={e => setRecievedPoints(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="points" className="mb-3">
                    <Form.Label>Piezīmes</Form.Label>
                    <Form.Control
                        placeholder="ļoti labi izpildīts darbs..."
                        as="textarea"
                        value={responseDescription}
                        onChange={e => setResponseDescription(e.target.value)}
                    />
                </Form.Group>

                <Button variant="dark" onClick={()=>{
                    postFeedback()
                }}>Publicēt</Button>
            </Modal.Body>
        </Modal>
    );
});

export default PracticeFeedbackModal;