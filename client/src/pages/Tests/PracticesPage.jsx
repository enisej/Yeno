import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {deletePractice} from "../../http/practiceAPI";
import {Context} from "../../index";
import {fetchPracticeTests} from "../../http/practiceAPI";
import PracticeCreateModal from "../../components/modals/practiceCreateModal";
import PracticeUpdateModal from "../../components/modals/practiceUpdateModal";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {HOME_ROUTE, PRACTICE_RESPONSE_ROUTE} from "../../utils/consts";

const PracticesPage = observer(() => {

    const history = useHistory()
    const userData = jwt_decode(localStorage.token)
    if(userData.status === 'USER'){
        history.push(HOME_ROUTE)
    }

    const [showTestCreate, setTestShowCreate] = useState(false)
    const [showTestUpdate, setTestShowUpdate] = useState(false)
    const [testToModal, setTestToModal] = useState('')

    const {practices} = useContext(Context)

    useEffect(() => {
        let isMounted = true;
        fetchPracticeTests().then(data => {

            if(isMounted) practices.setPracticeTest(data);

        })
        return () => { isMounted = false };
    },[practices])

    const deletePracticeItem = async (id) => {
        const data = await deletePractice(id)
        if(data){
            window.location.reload(false);
        }
    }


    return (
        <Container className="mb-xxl-5 p-3 ">
            <Card className="shadow mb-4">
                <Card.Body>
                    <Row>
                        <Col>
                            <Button
                                variant="success"
                                onClick={() => {setTestShowCreate(true);}}
                            >Pievienot testu
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Table responsive hover bordered striped className="shadow">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nosaukums</th>
                    <th>Links uz testu</th>
                    <th>Apraksts</th>
                    <th>Izveidots</th>
                    <th>Rediģēts</th>
                    <th>Rezultāti</th>
                    <th>Rediģēt</th>
                    <th>Izdzēst</th>
                </tr>
                </thead>

                <tbody>
                {practices.practices.map(practice =>
                    <tr key={practice.id}>
                        <td>{practice.id}</td>
                        <td>{practice.title}</td>
                        <td><a href={practice.link}>Links</a></td>
                        <td>{practice.description}</td>
                        <td>{practice.createdAt}</td>
                        <td>{practice.updatedAt}</td>
                        <td><Button variant="dark" onClick={()=>{history.push(PRACTICE_RESPONSE_ROUTE + '/' + practice.id)}}>Apskatīt</Button></td>
                        <td><Button variant="warning"
                                    onClick={() => {
                                        setTestToModal(practice)
                                        setTestShowUpdate(true)
                                    }}
                                    >Rediģēt</Button></td>
                        <td><Button
                            variant="danger"
                            onClick={()=>{deletePracticeItem(practice.id)}}
                        >Izdzēst</Button></td>
                    </tr>
                )}
                </tbody>

            </Table>
            <PracticeUpdateModal
                practice={testToModal}
                show={showTestUpdate}
                close={()=> setTestShowUpdate(false)}

            />
            <PracticeCreateModal
                show={showTestCreate}
                close={()=> setTestShowCreate(false)}
            />
        </Container>
    );
});

export default PracticesPage;