import React, {useContext, useEffect} from 'react';
import VacancyTestsList from "../../components/lists/vacancyTestsList";
import {Context} from "../../index";
import {fetchByTestId} from "../../http/testAPI";
import {useParams} from "react-router-dom";
import {fetchByPracticeId} from "../../http/practiceAPI";
import {observer} from "mobx-react-lite";

const VacancyTestPage = observer(() => {

    const {tests, practices} = useContext(Context)
    const {theoryTestId} = useParams()
    const {practiceExerciseId} = useParams()

    useEffect(() => {

        fetchByTestId(theoryTestId).then(data => {tests.setTheoryTests(data)
        })
    }, [tests, theoryTestId])

    useEffect(() => {

        fetchByPracticeId(practiceExerciseId).then(data => { practices.setPracticeTest(data)
        })
    }, [practices, practiceExerciseId])

    return (
        <div className='d-flex flex-column min-vh-100'>
            <VacancyTestsList practices={practices} tests={tests}/>
        </div>
    );
});

export default VacancyTestPage;