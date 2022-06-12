import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Dropdown, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createVacancy} from "../../http/vacanciesAPI";
import {Context} from "../../index";
import {toast, ToastContainer} from "react-toastify";

const VacancyCreateModal = observer((props) => {

    const {tests,practices} = useContext(Context)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [qualifications, setQualifications] = useState('')
    const [offer, setOffer] = useState('')
    const [theoryTestId, setTheoryTestId] = useState('')
    const [practiceExerciseId, setPracticeExerciseId] = useState('')
    const [validated, setValidated] = useState(false)
    const {vacancies} = useContext(Context)

    const [testData, setTestData] = useState([])
    const [practiceData, setPracticeData] = useState([])
    const [practiceTitle, setPracticeTitle]= useState('')
    const [theoryTitle, setTheoryTitle] = useState('')


    const post = async (event) => {

        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity()) {


        const data = await createVacancy(title, description, qualifications, offer, theoryTestId, practiceExerciseId)
        if(data){
            vacancies.setVacancies(data)
            const notify = () => toast.success(data.message);
            notify()
            setTitle('')
            setDescription('')
            setQualifications('')
            setOffer('')
            setPracticeExerciseId('')
            setTheoryTestId('')
            setPracticeTitle('')
            setTheoryTitle('')
            props.close()

        }
        }
    }


    return (

        <Modal show={props.show}
               size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               onShow={e=>{
                   setTestData(tests.tests)
                   setPracticeData(practices.practices)
               }}
        >
            <ToastContainer/>
            <Modal.Header closeButton
                          onClick={props.close}
                          className="p-4" >
                <h4>Vakances izveide</h4>
            </Modal.Header>
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
                <Dropdown className="mb-3" >
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                        Izvēlētais tests: {theoryTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item onClick={() => setTheoryTestId('') }>
                            Izvēlies testu
                        </Dropdown.Item>
                        {testData.map(test =>
                        <Dropdown.Item
                            key={test.id}
                            onClick={() => {
                                setTheoryTestId(test.id)
                                setTheoryTitle(test.title)
                            }}
                        >
                            {test.title}
                        </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                        <Dropdown className="mb-3">
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                 Izvēlētais uzdevums: {practiceTitle}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                <Dropdown.Item onClick={() => setPracticeExerciseId('') }>
                                    Izvēlies uzdevumu
                                </Dropdown.Item>
                                {practiceData.map(practice =>
                                    <Dropdown.Item
                                        key={practice.id}
                                        onClick={() => {
                                            setPracticeExerciseId(practice.id)
                                            setPracticeTitle(practice.title)}}
                                    >
                                        {practice.title}
                                    </Dropdown.Item>

                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                </Row>

                <Row  className="mt-4">

                <Button
                    className="shadow"
                    variant="success"
                    type='submit'
                >Publicēt</Button>

                </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default VacancyCreateModal;