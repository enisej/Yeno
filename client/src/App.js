import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navigation from "./components/UI/Navigation";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Container, Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

            check().then(data =>{
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))



    },[])
    
    if(loading){
        return <Container className="d-flex justify-content-center mt-xxl-5">
            <Spinner className="p-xxl-5" animation="border">

            </Spinner>


        </Container>

    }

  return (
    <BrowserRouter>
        <Navigation/>
        <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
