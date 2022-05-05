import React from 'react';
import { Container} from "react-bootstrap";
import MainInfo from "../components/staticInfo/MainInfo";
import Info from "../components/staticInfo/info";
import GoalCardInfo from "../components/staticInfo/GoalCardInfo";


const Home = () => {
    return (
        <Container>
            <MainInfo/>
            <GoalCardInfo/>
            <Info/>
        </Container>
    );
};

export default Home;