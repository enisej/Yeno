import React, {useContext, useEffect} from 'react';
import PracticeItem from "../../components/Items/PracticeItem";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import {fetchByPracticeId} from "../../http/practiceAPI";
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";

const PracticePage = observer(() => {

    const {practices} = useContext(Context)
    const {id} = useParams()

    useEffect(() => {

        fetchByPracticeId(id).then(data => {practices.setPracticeTest(data)
        })
    }, [practices, id])

    return (
        <Container className='d-flex flex-column min-vh-100'>
            <PracticeItem practices={practices}/>
        </Container>
    );
});

export default PracticePage;