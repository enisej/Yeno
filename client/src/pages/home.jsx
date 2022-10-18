import React from 'react';
import {Container} from "react-bootstrap";
import MainInfo from "../components/staticInfo/MainInfo";
import Info from "../components/staticInfo/info";
import GoalCardInfo from "../components/staticInfo/GoalCardInfo";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    return (
        <Container className='d-flex flex-column min-vh-100'>
            <MainInfo/>
            <GoalCardInfo/>
            <Info/>
        </Container>
    );
};

export default Home;