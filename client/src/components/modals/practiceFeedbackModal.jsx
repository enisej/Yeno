import React, {useContext, useState} from 'react';
import { Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {sendFeedback} from "../../http/PracticeResponsesAPI";
import {toast} from "react-toastify";
import {Context} from "../../index";

const PracticeFeedbackModal = observer((props) => {


    const [recievedPoints, setRecievedPoints] = useState('');
    const [responseDescription, setResponseDescription] = useState('');
    const {practiceResponses} = useContext(Context)
    const [validated, setValidated] = useState(false)

    const postFeedback = async (event) => {

        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {

            const feedback = true
            const id = props.id
            const data = await sendFeedback(id, recievedPoints, feedback, responseDescription)
            if (data) {
                practiceResponses.setPracticeResponse(data)
                const notify = () => toast.success(data.message);
                notify()
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
            <Modal.Header closeButton onClick={props.close} className="p-4"><h4>Vertējumu iesniegšana</h4></Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={postFeedback}>
                <Form.Group controlId="points" className="mb-3">
                    <Form.Label>Vertējums 1-10</Form.Label>
                    <Form.Control
                        placeholder="Atzīme"
                        value={recievedPoints}
                        onChange={e => setRecievedPoints(e.target.value)}
                        pattern='[0-9]{1,2}'
                        required
                    />
                </Form.Group>
                <Form.Group controlId="points" className="mb-3">
                    <Form.Label>Piezīmes</Form.Label>
                    <Form.Control
                        placeholder="ļoti labi izpildīts darbs..."
                        as="textarea"
                        value={responseDescription}
                        onChange={e => setResponseDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="success" type='submit'>Publicēt</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default PracticeFeedbackModal;