import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Modal, Dropdown, Row, Col} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createVacancy} from "../../http/vacanciesAPI";
import {Context} from "../../index";
import {fetchTests} from "../../http/testAPI";
import {fetchPracticeTests} from "../../http/practiceAPI";
import {toast, ToastContainer} from "react-toastify";

const VacancyCreateModal = observer((props) => {

    const {tests} = useContext(Context)

    useEffect(() => {
        fetchTests().then(data => {
            tests.setTheoryTests(data)
        })
    }, [tests])

    const {practices} = useContext(Context)

    useEffect(() => {
        fetchPracticeTests().then(data => {
            practices.setPracticeTest(data)
        })
    }, [practices])

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [qualifications, setQualifications] = useState('')
    const [offer, setOffer] = useState('')
    const [theoryTestId, setTheoryTestId] = useState('')
    const [practiceExerciseId, setPracticeExerciseId] = useState('')

    const post = async () => {
        const data = await createVacancy(title, description, qualifications, offer, theoryTestId, practiceExerciseId)
        if(data){
            const notify = () => toast.success(data.message);
            notify()
        }
    }


    return (
        <ToastContainer/>,
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

                <Row className="d-flex justify-content-center">
                    <Col sm={3} >
                <Dropdown className="mb-2">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Izvēlētais tests: {theoryTestId}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item onClick={() => setTheoryTestId('') }>
                            Izvēlies testu
                        </Dropdown.Item>
                        {tests.tests.map(test =>
                        <Dropdown.Item
                            key={test.id}
                            onClick={() => setTheoryTestId(test.id) }
                        >
                            {test.title}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                    </Col>
                    <Col sm={3}>
                        <Dropdown className="mb-2">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                 Izvēlētais uzdevums: {practiceExerciseId}
                            </Dropdown.Toggle>


                            <Dropdown.Menu >
                                <Dropdown.Item onClick={() => setPracticeExerciseId('') }>
                                    Izvēlies uzdevumu
                                </Dropdown.Item>
                                {practices.practices.map(practice =>
                                    <Dropdown.Item
                                        key={practice.id}
                                        onClick={() => setPracticeExerciseId(practice.id) }
                                    >
                                        {practice.title}
                                    </Dropdown.Item>

                                )}
                            </Dropdown.Menu>
                        </Dropdown>


                    </Col>
                </Row>

                <Row  className="mt-4">

                <Button
                    className="shadow"
                    variant="dark"
                    onClick={e=> {
                        post()
                        props.close()
                        setTitle('')
                        setDescription('')
                        setQualifications('')
                        setOffer('')
                        setPracticeExerciseId('')
                        setTheoryTestId('')

                    }}

                >Publicēt</Button>

                </Row>
            </Modal.Body>
        </Modal>
    );
});

export default VacancyCreateModal;