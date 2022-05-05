import React, {useContext, useEffect} from 'react';
import TestItem from "../../components/Items/TestItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import {fetchByTestId} from "../../http/testAPI";


const TestPage = observer(() => {

    const {tests} = useContext(Context)
    const {id} = useParams()

    useEffect(() => {

        fetchByTestId(id).then(data => {tests.setTheoryTests(data)
        })
    }, [tests, id])

    return (
        <div>
            <TestItem tests={tests}/>
        </div>
    );
});

export default TestPage;