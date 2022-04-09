import React, {useContext} from 'react';
import {Context} from "../../index";
import {Image, Nav, Navbar, Button} from "react-bootstrap";
import logo from "../../images/racoon.png";
import {observer} from "mobx-react-lite";


const Navigation = observer(() => {

    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" expand="lg" variant="dark">

                <Nav.Link href="/home"><Image style={{height: '4rem'}} src={logo}/></Nav.Link>
                    {user.isAuth ?

                        <Nav className="me-auto">
                            <Button className={"nav-link"} variant={"outline-dark"} >Sākums</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} >Vakances</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} >Profils</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => user.setIsAuth(false)} >Iziet</Button>

                        </Nav>

                        :

                        <Nav className="me-auto">
                            <Button className={"nav-link"} variant={"outline-dark"}>Sākums</Button>
                            <Button className={"nav-link"} variant={"outline-dark"}>Vakances</Button>
                            <Button className={"nav-link"} variant={"outline-dark"}>Reģistrēties</Button>
                            <Button className={"nav-link"} variant={"outline-dark"} onClick={() => user.setIsAuth(true)}>Pieslegties</Button>
                        </Nav>

                    }
        </Navbar>
    );
});

export default Navigation;