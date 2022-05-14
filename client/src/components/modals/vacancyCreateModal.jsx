import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createVacancy} from "../../http/vacanciesAPI";


const VacancyCreateModal = observer((props) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [qualifications, setQualifications] = useState('')
    const [offer, setOffer] = useState('')
    const [theoryTestId, setTheoryTestId] = useState('')
    const [practiceTestId, setPracticeTestId] = useState('')


    const post = async () => {
        const data = await createVacancy(title, description, qualifications, offer, theoryTestId, practiceTestId)

        if(data){
            window.location.reload(false);
        }

    }

    return (
        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
        >
            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >
                <h4>Vakances izveide</h4>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Nosakumus</Form.Label>
                    <Form.Control
                        placeholder="Nosaukums"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Apraksts</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={7}
                        placeholder="Vakances apraksts"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                </Form.Group>

                <Form.Group controlId="qualifications" className="mb-3" >
                    <Form.Label>Darba pieredze</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={7}
                        placeholder="Vajadzīga pieredze"
                        value={qualifications}
                        onChange={e => setQualifications(e.target.value)}
                    />

                </Form.Group>

                <Form.Group controlId="offer" className="mb-3">
                    <Form.Label>Ko mēs piedavājam</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={7}
                        placeholder="Mūsu piedāvājumi"
                        value={offer}
                        onChange={e => setOffer(e.target.value)}
                    />

                </Form.Group>
                <Form.Group controlId="theoryTestId" className="mb-3">
                    <Form.Label>theoryTestId</Form.Label>
                    <Form.Control
                        placeholder="theoryTestId"
                        value={theoryTestId}
                        onChange={e => setTheoryTestId(e.target.value)}
                    />

                </Form.Group>
                <Form.Group controlId="practiceTestId" className="mb-3">
                    <Form.Label>practiceTestId</Form.Label>
                    <Form.Control
                        placeholder="practiceTestId"
                        value={practiceTestId}
                        onChange={e => setPracticeTestId(e.target.value)}
                    />

                </Form.Group>
                <Button variant="dark" onClick={post}
                >Publicēt</Button>
            </Modal.Body>
        </Modal>
    );
});

export default VacancyCreateModal;