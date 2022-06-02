import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navigation from "./components/UI/Navigation";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Container, Spinner, Col, Row} from "react-bootstrap";
import Footer from "./components/UI/footer";
import "bootstrap-icons/font/bootstrap-icons.css"


const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
            check().then(data =>{
                if(data){
                user.setUser(data)
                user.setIsAuth(true)
                }
                if(!data){
                    user.setUser('')
                    user.setIsAuth(false)
                }
            }).finally(() => setLoading(false))



    },[user])

    if(loading){
        return <Container className="mt-xxl-5">
            <Row className=" justify-content-md-center">
                <Col md="auto">
                    <Spinner className="p-lg-5" variant="dark" animation="border"> </Spinner>
                </Col>
            </Row>
            <Row className="justify-content-md-center ">
                <Col md="auto" >
                    <h1>Notiek ielāde </h1>

                </Col>

            </Row>

        </Container>

    };

  return (

    <BrowserRouter>
        <Navigation/>
        <AppRouter />
        <Footer/>
    </BrowserRouter>

  );
});

export default App;
