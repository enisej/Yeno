import React from 'react';
import {Navbar, Container, Nav, Image} from "react-bootstrap";
import logo from '../../images/racoon.png';


const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>

                    <Image style={{height:'4rem'}} src={logo}/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Sākums</Nav.Link>
                            <Nav.Link href="/vakancies">Vakances</Nav.Link>
                            <Nav.Link href="/register">Reģistrēties</Nav.Link>
                            <Nav.Link href="/login">Pieslegties</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;