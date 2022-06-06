import React from 'react';
import {Card, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <Card className='bg-light mt-auto' >
            <Row className="m-2">
                Kontakti: yeno@yeno.info. +371 228 228 22. Rēzekne, Varoņu iela 11a.
            </Row>
        </Card>
    );
};

export default Footer;