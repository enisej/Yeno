import React from 'react';
import {observer} from "mobx-react-lite";
//import {Context} from "../../index";
//import {useParams} from "react-router-dom"


const TestItem = observer(() => {



    const test = {
        id: 1,
        title: "Python easy test",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScfo7T5IE7fRe0ht5LqJdZ0OYgwx58vCnFVfDN9OaVFCLaCVQ/viewform?usp=sf_link",
        description: "Easy test",
        activeFrom: "2022-03-02T22:00:00.000Z",
        activeTo: "2022-05-04T21:00:00.000Z"
    }

    //let {id} = useParams()

        document.body.style.overflow = "hidden"




    return (
            <iframe
                title={test.id}
                src={test.link}
                frameBorder="0"
                width="100%"
                height={window.innerHeight}



            />

    );
});

export default TestItem;