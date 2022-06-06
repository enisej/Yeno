import React, {useContext, useEffect, useState} from 'react';
import { Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchTests} from "../../http/testAPI";
import {fetchPracticeTests} from "../../http/practiceAPI";
import {updateVacancy} from "../../http/vacanciesAPI";
import {toast, ToastContainer} from "react-toastify";
const VacancyUpdateModal = observer((props) => {


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


    const [status, setStatus] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [qualifications, setQualifications] = useState('')
    const [offer, setOffer] = useState('')
    const [theoryTestId, setTheoryTestId] = useState('')
    const [practiceExerciseId, setPracticeExerciseId] = useState('')
    const [validated, setValidated] = useState(false)

    const {vacancies} = useContext(Context)

    const update = async (event) => {

        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {

            const id = props.vacancy.id
            const data = await updateVacancy(id, title, description, qualifications, offer, theoryTestId, practiceExerciseId, status)

            if (data) {
                vacancies.setVacancies(data)
                const notify = () => toast.success(data.message);
                notify()
                props.close()
            }
        }
    }


    return (
        <ToastContainer/>,
        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               onShow={e => {
                   setTitle(props.vacancy.title)
                   setDescription(props.vacancy.description)
                   setQualifications(props.vacancy.qualifications)
                   setOffer(props.vacancy.offer)
                   setTheoryTestId(props.vacancy.theoryTestId)
                   setPracticeExerciseId(props.vacancy.practiceExerciseId)
                   setStatus(props.vacancy.status)
               }}
        >
            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4">
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={update}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Nosakumus</Form.Label>
                    <Form.Control
                        placeholder="Nosaukums"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
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
                        required
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
                        required
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
                        required
                    />

                </Form.Group>
                    <Row className="d-flex justify-content-center">
                        <Col sm={3}>
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
                                        {test.id}. {test.title}
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
                                        {practice.id}. {practice.title}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                    </Row>
                        <Form.Label>
                            {status === false ?
                                <Button variant="success" onClick={e => {
                                    setStatus('true')

                                }}>
                                    Aktivizēt
                                </Button>
                                :
                                <Button variant="danger" onClick={e => {
                                    setStatus('false')
                                }}>
                                    Deaktivizēt
                                </Button>

                            }
                        </Form.Label>

                <Row  className="mt-4">


                    <Button
                        className="shadow"
                        variant="success"
                        type='submit'
                    >Saglabāt izmaiņas</Button>
                </Row>
                </Form>
            </Modal.Body>

        </Modal>
    );
});

export default VacancyUpdateModal;