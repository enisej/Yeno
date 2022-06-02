import React from 'react';
import {Button, Card, Image} from "react-bootstrap";
import {REQUESTED_VACANCIES_ROUTE, USER_RESPONSES_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";
import arrow from "bootstrap-icons/icons/arrow-return-right.svg";
import {observer} from "mobx-react-lite";


const UserProfileItems = observer(() => {
    const history = useHistory()

    return (
        <Card  className="p-3 mt-2 ">
                <Button className="m-2 shadow" variant="outline-dark" onClick={() => {history.push(USER_RESPONSES_ROUTE)}}><Image src={arrow} alt={arrow}/>Jūsu praktisko uzdevumu rezultāti</Button>
                <Button variant="outline-dark" className="shadow m-2" onClick={e=>{history.push(REQUESTED_VACANCIES_ROUTE)}} ><Image src={arrow} alt={arrow}/>Jūsu pieteiktas vakances</Button>
        </Card>
    );
});

export default UserProfileItems;