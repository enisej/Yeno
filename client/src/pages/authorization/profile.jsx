import React, {useContext, useState} from 'react';
import {Card, Col, Container, Image, Row, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import logo from "../../images/user.png";
import arrow from "bootstrap-icons/icons/arrow-return-right.svg";
import globe from "bootstrap-icons/icons/globe.svg";
import gem from "bootstrap-icons/icons/gem.svg";
import git from "bootstrap-icons/icons/git.svg";
import {format, parseISO} from "date-fns";
import {useHistory} from "react-router-dom";
import {deleteUser} from "../../http/userAPI";
import {
    HOME_ROUTE,
    PRACTICES_ROUTE, REQUESTED_VACANCIES_ROUTE,
    TESTS_ROUTE,
    USER_RESPONSES_ROUTE
} from "../../utils/consts";
import {Context} from "../../index";
import UserUpdateModal from "../../components/modals/userUpdateModal";



const Profile = observer(() => {


    const history = useHistory()
    const userData = jwt_decode(localStorage.token)

    const date = parseISO(userData.birthDate)
    const birthDate = format(date, 'yyyy/MM/dd')
    const {user} = useContext(Context)


    const deleteProfile = async (id) => {
        const data = await deleteUser(id)
        if(data){
            user.setUser({})
            user.setIsAuth(false)
            window.location.href=HOME_ROUTE;
            localStorage.removeItem('token')
        }
    }

    const [show, setShow] = useState(false);

    return (
        <Container className=" p-4 mt-3 shadow bg-light">
            <Row>

                <Col sm={4} >
                    <Card  className="p-3 d-flex align-items-center">
                    <Image className="bg-light rounded-circle shadow" src={logo} width={100} height={100}/>
                    <h2 className="mt-2">{userData.name} {userData.surname}</h2>
                        <Card.Link><Image src={globe} alt={globe}/> {userData.cv}</Card.Link>
                    <p>{userData.status}</p>
                        <Col>
                        <Button className="me-1"
                                variant="dark"
                                onClick={() =>
                                    setShow(true)
                                 }
                        >Rediģet</Button>
                        <Button className="me-1" variant="outline-danger" onClick={() => deleteProfile(userData.id)} >Izdzēst</Button>
                        </Col>
                </Card>
                    {userData.status === 'ADMIN'
                        ?
                    <Card  className="p-3 mt-2">
                        <Row>
                            <Col  className="mb-2">
                            <Button className="me-1"
                                    variant="outline-dark"
                                    onClick={() => history.push(PRACTICES_ROUTE)}
                            >
                                Praktiskie testi</Button>
                        </Col>
                            <Col  className="mb-2">
                        <Button className="me-1"
                                variant="outline-dark"
                                onClick={() => history.push(TESTS_ROUTE)}
                        >
                             Teoretiskie testi</Button>

                            </Col>
                        </Row>
                    </Card>
                        :
                        <Card  className="p-3 mt-2 d-flex align-items-center">
                            <Button className="me-1" variant="outline-dark"
                                    onClick={() => {
                                        history.push(USER_RESPONSES_ROUTE)
                                    }}>Praktisko uzdevumu rezultāti</Button>
                        </Card>

                    }
                </Col>
                <Col sm={8} >
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>Vārds: </b> </Col>
                                    <Col>{userData.name}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>Uzvārds: </b> </Col>
                                    <Col>{userData.surname}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>E-pasts: </b> </Col>
                                    <Col>{userData.email}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>Telefona numurs: </b> </Col>
                                    <Col>{userData.tel_number}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>Dzimšanas datums: </b> </Col>
                                    <Col>{birthDate}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>CV: </b> </Col>
                                    <Col><Button variant="outline-secondary"><a href={userData.cv} ><Image src={gem} alt={gem}/></a></Button></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col><b>GitHub: </b> </Col>
                                    <Col><Button variant="outline-secondary"><a href={userData.githubLink}><Image src={git} alt={git}/></a></Button></Col>
                                </Row>

                            </ListGroupItem>
                        </ListGroup>

                    <Col className="d-inline">
                        {userData.status === 'ADMIN'
                            ?
                            <Card className="mt-2">
                                <Button variant="dark" >Lietotāju saraksts</Button>
                            </Card>
                            :

                        <Card className="mt-2">
                            <Button variant="outline-dark" className="shadow" onClick={e=>{history.push(REQUESTED_VACANCIES_ROUTE)}} ><Image src={arrow} alt={arrow}/>Jūsu pieteiktas vakances</Button>
                        </Card>}
                    </Col>
                </Col>
            </Row>
            <Row className="mt-3">


            </Row>

            <UserUpdateModal
                show={show}
                user={userData}
                close={() => setShow (false)}/>

        </Container>
    );
});

export default Profile;