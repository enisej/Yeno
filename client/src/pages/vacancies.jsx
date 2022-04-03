import React from 'react';
import headImage from "../images/penis.jpg";
import {Image} from "react-bootstrap";
import VacancyItem from "../components/UI/vacancyItem";

const Vacancies = () => {



    return (
        <div>
            <Image src={headImage}  alt="head" width="100%" height="250px"></Image>
            <VacancyItem/>
        </div>
    );
};

export default Vacancies;