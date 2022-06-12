import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

import UserUpdateModal from "../modals/userUpdateModal";
import {deleteUser, getUser} from "../../http/userAPI";
import {HOME_ROUTE} from "../../utils/consts";
import {format, parseISO} from "date-fns";
import {Context} from "../../index";
import jwt_decode from "jwt-decode";
import {ToastContainer} from "react-toastify";
import PasswordChangeModal from "../modals/passwordChangeModal";
import ImageChangeModal from "../modals/imageChangeModal";
import profLogo from '../../images/user.jpg';

const ProfileDataItem = observer(() => {

    const [show, setShow] = useState(false);
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
    const userData = jwt_decode(localStorage.token)
    const date = parseISO(userData.birthDate)
    const birthDate = format(date, 'yyyy/MM/dd')
    const [data, setData] = useState([])
    const [passwordChange, setPasswordChange] = useState(false)


    useEffect(() => {
        getUser(userData.id).then(data => {
            setData(data)


        })
    }, [userData.id , data.img])

    const [imageCrop, setImageCrop] = useState(false)



    return (
        <Row>
            <ToastContainer/>
            <Col sm={4}>
                <Card className="p-3 d-flex align-items-center">
                    {data.img ?
                    <Image className="bg-light rounded-circle shadow"
                           src={process.env.REACT_APP_API_URL + data.img} width={100}
                           height={100}/>
                        :
                        <Image className="bg-light rounded-circle shadow"
                               src={profLogo} alt={profLogo} width={100}
                               height={100}/>
                    }
                    <Button variant='outline-success' className="m-2" onClick={e =>setImageCrop(true)}><i className='bi-image '></i></Button>
                    <h2 className="mt-2"><b>{data.name} {data.surname}</b></h2>

                    {data.status === 'ADMIN'
                        ?
                        <h4>Administrators</h4>
                        :
                        <h4>Lietotājs</h4>
                    }
                    <Col className='mt-3'>
                        <Button className="me-1 mb-4"
                                variant="outline-warning"
                                onClick={() =>
                                    setShow(true)
                                }
                        ><i className="bi-pencil"></i></Button>
                        <Button className="me-1 mb-4" variant="outline-danger"
                                onClick={() => deleteProfile(data.id)}><i className="bi-trash"></i></Button>
                    </Col>
                </Card>
            </Col>
            <Col sm={8}>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col><b>Vārds: </b> </Col>
                            <Col>{data.name}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>Uzvārds: </b> </Col>
                            <Col>{data.surname}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>E-pasts: </b> </Col>
                            <Col>{data.email}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>Telefona numurs: </b> </Col>
                            <Col>{data.tel_number}</Col>
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
                            <Col><Button size="sm" variant="outline-dark" href={'http://' + data.cv}>cv</Button></Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col><b>GitHub: </b> </Col>
                            <Col><Button size="sm" variant="outline-dark" href={'http://' + data.githubLink}><i className="bi-github"></i></Button></Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
                <Card className="d-flex align-items-center mt-2">
                    <Row>
                        <Col className="p-2"><Button size='sm'  variant="outline-info" onClick={() => setPasswordChange(true)}><i className="bi-pen"></i> Pamainīt paroli</Button></Col>
                    </Row>
                </Card>
                <UserUpdateModal
                    show={show}
                    user={data}
                    close={() => setShow(false)}/>

                <PasswordChangeModal
                    show={passwordChange}
                    userId={data.id}
                    close={() => setPasswordChange(false)}/>
                <ImageChangeModal
                    show={imageCrop}
                    userId={data.id}
                    close={()=> setImageCrop(false)}

                />


            </Col>
        </Row>


    );
});

export default ProfileDataItem;