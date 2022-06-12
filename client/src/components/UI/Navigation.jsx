import React, {useContext} from 'react';
import {Context} from "../../index";
import {Image, Nav, Navbar, Button} from "react-bootstrap";
import logo from "../../images/logo.png";
import {observer} from "mobx-react-lite";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    PRACTICES_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE, TESTS_ROUTE,
    VACANCIES_ROUTE
} from "../../utils/consts";
import {useHistory} from "react-router-dom"

const Navigation = observer(() => {

    const history = useHistory()
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser('')
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar  collapseOnSelect bg="dark" className="p-2" expand="lg" variant="dark">
                <Nav.Link href="/home"><Image style={{height: '2.5rem'}} src={logo}/></Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {user.isAuth ?
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => history.push(HOME_ROUTE)} >Sākums</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(VACANCIES_ROUTE)}>Vakances</Button>
                            {user.user.status === 'ADMIN' ?
                                <>
                                <Button className={"nav-link"} variant={"outline-dark"}
                                        onClick={() => history.push(PRACTICES_ROUTE)}>Praktskie testi</Button>
                                <Button className={"nav-link"} variant={"outline-dark"}
                                        onClick={() => history.push(TESTS_ROUTE)}>Teoretiskie testi</Button>
                                </>
                                :
                                <></>
                            }
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(PROFILE_ROUTE)} >Profils</Button>
                        </Nav>
                            <Nav>
                                <Button className="nav-link" variant={"outline-dark"} onClick={() => logOut()} >Iziet</Button>
                            </Nav>
                        </Navbar.Collapse>

                        :
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(HOME_ROUTE)}>Sākums</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(VACANCIES_ROUTE)}>Vakances</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() =>history.push(REGISTER_ROUTE)} >Reģistrēties</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => history.push(LOGIN_ROUTE)}>Pieslēgšanas</Button>
                        </Nav>
                        </Navbar.Collapse>
                    }

        </Navbar>
    );
});

export default Navigation;