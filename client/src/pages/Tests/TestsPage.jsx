import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";

import {Button, Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import download from "bootstrap-icons/icons/cloud-download.svg";

import {deleteTest, fetchTests} from "../../http/testAPI";
import {Context} from "../../index";

import {format, parseISO} from "date-fns";

import TestUpdateModal from "../../components/modals/testUpdateModal";
import TestCreateModal from "../../components/modals/testCreateModal";

import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";


const TestsPage = observer(() => {

    const history = useHistory()
    const userData = jwt_decode(localStorage.token)
    if(userData.status === 'USER'){
        history.push(HOME_ROUTE)
    }

    const [showTestCreate, setTestShowCreate] = useState(false)
    const [showTestUpdate, setTestShowUpdate] = useState(false)
    const [testToModal, setTestToModal] = useState('')

    const {tests} = useContext(Context)

    useEffect(() => {
        let isMounted = true;
        fetchTests().then(data => {
            if (isMounted) tests.setTheoryTests(data);
        })
        return () => { isMounted = false };
    },[tests])


    const deleteTestItem = async (id) => {
        const data = await deleteTest(id)
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
                {tests.tests.map(test =>
                <tr key={test.id}>
                    <td>{test.id}</td>
                    <td>{test.title}</td>
                    <td><a href={test.link}>Links</a></td>
                    <td>{test.description}</td>
                    <td>{format(parseISO(test.createdAt), 'dd/MM/yyyy')}</td>
                    <td>{format(parseISO(test.updatedAt), 'dd/MM/yyyy')}</td>
                    <td><Button href={test.responseLink.replace("/pubhtml", "/pub?output=xlsx")} variant="outline-dark"
                    ><Image src={download}  alt={download}/></Button></td>
                    <td><Button variant="warning"
                                onClick={() => {
                                    setTestShowUpdate(true);
                                    setTestToModal(test);
                    }}>Rediģēt</Button></td>
                    <td><Button
                        variant="danger"
                        onClick={()=>{deleteTestItem(test.id)}}
                    >Izdzēst</Button></td>
                </tr>
                )}
                </tbody>

            </Table>
            <TestUpdateModal
                test={testToModal}
                show={showTestUpdate}
                close={()=> setTestShowUpdate(false)}

            />
            <TestCreateModal

                show={showTestCreate}
                close={()=> setTestShowCreate(false)}
            />
        </Container>
    );
});

export default TestsPage;