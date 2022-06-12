import React, {useContext, useEffect, useRef, useState} from 'react';
import {Context} from "../../index";
import {fetchResponsesByTestId, TestWithoutFeedback, TopTestResults} from "../../http/PracticeResponsesAPI";
import {useParams} from "react-router-dom";
import {Card, Col, Container, DropdownButton, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Button} from "react-bootstrap";
import PracticeFeedbackModal from "../../components/modals/practiceFeedbackModal";
import NotFound from "../../components/alerts/NotFound";
import {format, parseISO} from "date-fns";
import {ToastContainer} from "react-toastify";
import {useReactToPrint} from "react-to-print";
import PracticeResultsReport from "../../components/modals/ReportModals/PracticeResultsReport";
import DropdownItem from "react-bootstrap/DropdownItem";




const PracticeResponses = observer(() => {



    const [showFeedbackCreate , setShowFeedbackCreate] = useState(false);
    const [responseId, setResponseId] = useState('');
    const [showReport, setShowReport] = useState(false)

    const {practiceResponses} = useContext(Context)
    const id = useParams().id

    useEffect(() => {
        fetchResponsesByTestId(id).then(data => {
            practiceResponses.setPracticeResponse(data)

        })
    }, [ id, practiceResponses])

    const componentRef = useRef(id);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [vacancy, setVacancy] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState(false)
    const [cancel, setCancel] = useState(true)

    const orderByPoints = async () => {
        setMessage(true)
        setFeedbackMessage(false)
        setCancel(false)
        await TopTestResults(id).then(data=>{
             practiceResponses.setPracticeResponse(data)
        })
    }

    const orderByFeedback = async () => {
        setMessage(false)
        setFeedbackMessage(true)
        setCancel(false)
        await TestWithoutFeedback(id).then(data=>{
            practiceResponses.setPracticeResponse(data)
        })
    }
    const Cancel = async () => {
        setMessage(false)
        setFeedbackMessage(false)
        await fetchResponsesByTestId(id).then(data => {
            practiceResponses.setPracticeResponse(data)
        })
    }

    return (
        <Container className="mb-xxl-5 mt-2 d-flex flex-column min-vh-100 " >
            <ToastContainer/>
            <Card className="mb-2 shadow">

                <Row>
                    <Col className="m-3" >
                        <h4 className="fw-bold mt-2">Praktiskā uzdevuma rezultāti</h4>
                    </Col>
                    <Col className="m-3" sm={1}>
                        <DropdownButton title='Filtrēt' variant="secondary">
                            <DropdownItem variant="outline-dark" disabled={cancel} onClick={e=>{Cancel()
                            }}>Atcelt filtrus</DropdownItem>
                            <DropdownItem variant="outline-dark" disabled={message} onClick={e=>{orderByPoints()
                            }}>Pēc labāka rezultāta</DropdownItem>

                            <DropdownItem variant="outline-dark" disabled={feedbackMessage} onClick={e=>{orderByFeedback()
                            }}>Pēc atsauksmes</DropdownItem>

                        </DropdownButton>

                    </Col>
                    <Col className="m-3" sm={1}>
                        <Button variant="secondary" onClick={handlePrint}><i className="bi-printer"></i></Button>
                    </Col>
                </Row>
            </Card>

            {practiceResponses.practiceResponse.length
                ?
                <div ref={componentRef} >
                <Card className="d-flex align-items-center shadow"  >
                    {practiceResponses.practiceResponse.map(response =>
                        <Col sm={8} key={response.id} >
                            <ListGroup >
                                <Card className="m-3"  >
                                    <ListGroupItem>
                                        <Row>
                                            <Col><b>Atbildi iesniedza</b> </Col>
                                            <Col> {response.user.name} {response.user.surname}</Col>
                                        </Row>
                                    </ListGroupItem >
                                    <ListGroupItem >
                                        <Row>
                                            <Col><b>E-pasts </b> </Col>
                                            <Col><a href={"mailto:" + response.user.email}  >{response.user.email}</a></Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col><b>Vakance </b> </Col>
                                            <Col>{response.requestedVacancy.vacancyId}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col><b>Uzdevuma izpildes laiks</b> </Col>
                                            <Col> {format(parseISO(response.createdAt), 'Pp')}-{ format(parseISO(response.requestedVacancy.createdAt),'Pp') }</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col><b>Uzdevuma nosaukums</b> </Col>
                                            <Col> <Card.Link
                                                href={response.practiceExerciseId.link}>{response.practiceExercise.title}</Card.Link></Col>
                                        </Row>
                                    </ListGroupItem>
                                    {response.Feedback === false
                                        ?
                                        <>
                                        <ListGroupItem>
                                            <Row>
                                                <Col><b>Iesniegta atbilde </b> </Col>
                                                <Col><Button href={'http://'+response.responseLink}
                                                             variant="outline-info"><i className="bi-info-lg"></i></Button></Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col><b>Izlikt rezultātus </b></Col>
                                                <Col><Button variant="success" onClick={() => {
                                                    setShowFeedbackCreate(true)
                                                    setResponseId(response.id)
                                                }}>Iesniegt vertējumu</Button></Col>
                                            </Row>
                                        </ListGroupItem>
                                        </>
                                        :
                                        <>
                                        <ListGroupItem>
                                            <Row>
                                                <Col><b>Piezīmes</b> </Col>
                                                <Col>{response.responseDescription}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    <b>Saņemtie punkti</b>
                                                </Col>
                                                <Col>
                                                    <Card.Text>{response.RecievedPoints}</Card.Text>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                            <ListGroupItem >
                                                <Row>
                                                    <Col>
                                                        <b>Printēt rezultātu</b>
                                                    </Col>
                                            <Col>
                                                <Button variant="secondary" onClick={event => {
                                                    setEmail(response.user.email)
                                                    setName(response.user.name)
                                                    setSurname(response.user.surname)
                                                    setVacancy(response.requestedVacancy.vacancyId)
                                                    setDate(format(parseISO(response.createdAt), 'Pp') + ' - ' + format(parseISO(response.requestedVacancy.createdAt),'Pp'))
                                                    setTitle(response.practiceExercise.title)
                                                    setShowReport(true);

                                                }}><i className="bi-printer"></i></Button>
                                            </Col>
                                                </Row>
                                            </ListGroupItem>
                                        </>
                                    }
                                </Card>

                            </ListGroup>

                        </Col>




                    )}
                    <PracticeResultsReport
                        name={name}
                        surname={surname}
                        email={email}
                        vacancy={vacancy}
                        date={date}
                        title={title}
                        show={showReport}
                        close={()=>setShowReport(false)}
                    />
                    <PracticeFeedbackModal
                        id={responseId}
                        show={showFeedbackCreate}
                        close={() => setShowFeedbackCreate(false)}/>

                </Card>
                </div>
                :
                <NotFound/>
            }
        </Container>
    );
});

export default PracticeResponses;