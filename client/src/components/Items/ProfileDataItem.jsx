import React, {useContext, useState} from 'react';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import globe from "bootstrap-icons/icons/globe.svg";
import gem from "bootstrap-icons/icons/gem.svg";
import git from "bootstrap-icons/icons/git.svg";
import logo from "../../images/user.png";
import UserUpdateModal from "../modals/userUpdateModal";
import {deleteUser} from "../../http/userAPI";
import {HOME_ROUTE} from "../../utils/consts";
import {format, parseISO} from "date-fns";
import {Context} from "../../index";
import jwt_decode from "jwt-decode";

const ProfileDataItem = observer(() => {

    const [show, setShow] = useState(false);

    const deleteProfile = async (id) => {
        const data = await deleteUser(id)
        if(data){
            user.setUser({})
            user.setIsAuth(false)
            window.location.href=HOME_ROUTE;
            localStorage.removeItem('token')
        }
    }
    const userData = jwt_decode(localStorage.token)
    const date = parseISO(userData.birthDate)
    const birthDate = format(date, 'yyyy/MM/dd')
    const {user} = useContext(Context)

    return (
        <Row>
            <Col sm={4} >
                <Card  className="p-3 d-flex align-items-center">
                    <Image className="bg-light rounded-circle shadow" src={logo} width={100} height={100}/>
                    <h2 className="mt-2">{userData.name} {userData.surname}</h2>
                    <Card.Link><Image src={globe} alt={globe}/> {userData.cv}</Card.Link>
                    <p>{userData.status}</p>
                    <Col>
                        <Button className="me-1 mb-4"
                                variant="dark"
                                onClick={() =>
                                    setShow(true)
                                }
                        >Rediģet</Button>
                        <Button className="me-1 mb-4" variant="outline-danger" onClick={() => deleteProfile(userData.id)} >Izdzēst</Button>
                    </Col>
                </Card>
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
                <UserUpdateModal
                    show={show}
                    user={userData}
                    close={() => setShow (false)}/>
            </Col>
        </Row>
    );
});

export default ProfileDataItem;