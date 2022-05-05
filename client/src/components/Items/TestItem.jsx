import React from 'react';
import {observer} from "mobx-react-lite";
//import {Context} from "../../index";
//import {useParams} from "react-router-dom"


const TestItem = observer(({tests}) => {
        document.body.style.overflow = "hidden"
    return (
            <iframe
                title={tests.tests.link}
                src={tests.tests.link}
                frameBorder="0"
                width="100%"
                height={window.innerHeight}
            />

    );
});

export default TestItem;