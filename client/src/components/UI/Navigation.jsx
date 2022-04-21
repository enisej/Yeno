import React, {useContext} from 'react';
import {Context} from "../../index";
import {Image, Nav, Navbar, Button} from "react-bootstrap";
import logo from "../../images/racoon.png";
import {observer} from "mobx-react-lite";
import {HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, VACANCIES_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom"

const Navigation = observer(() => {

    const history = useHistory()
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }


    return (
        <Navbar bg="dark" expand="lg" variant="dark">

                <Nav.Link href="/home"><Image style={{height: '4rem'}} src={logo}/></Nav.Link>
                    {user.isAuth ?

                        <Nav className="me-auto">
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => history.push(HOME_ROUTE)} >Sākums</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(VACANCIES_ROUTE)}>Vakances</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(PROFILE_ROUTE)} >Profils</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => logOut()} >Iziet</Button>

                        </Nav>

                        :

                        <Nav className="me-auto">
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(HOME_ROUTE)}>Sākums</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(VACANCIES_ROUTE)}>Vakances</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(REGISTER_ROUTE)} >Reģistrēties</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => history.push(LOGIN_ROUTE)}>Pieslegties</Button>
                        </Nav>

                    }
        </Navbar>
    );
});

export default Navigation;