import React from 'react';
import {Button, Image} from "react-bootstrap";
import icon from "bootstrap-icons/icons/arrow-clockwise.svg";

const RefreshButton = () => {
    return (
        <Button variant="outline-dark" className="m-2" onClick={event => {window.location.reload(false)}}>
            <Image src={icon} alt={icon}/>
        </Button>
    );
};

export default RefreshButton;