import React, {useContext, useEffect} from 'react';
import PracticeItem from "../../components/Items/PracticeItem";
import {Context} from "../../index";
import {useParams} from "react-router-dom";
import {fetchByPracticeId} from "../../http/practiceAPI";
import {observer} from "mobx-react-lite";

const PracticePage = observer(() => {

    const {practices} = useContext(Context)
    const {id} = useParams()

    useEffect(() => {

        fetchByPracticeId(id).then(data => {practices.setPracticeTest(data)
        })
    }, [practices, id])

    return (
        <div>
            <PracticeItem practices={practices}/>
        </div>
    );
});

export default PracticePage;