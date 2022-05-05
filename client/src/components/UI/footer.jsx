import React from 'react';
import {Row} from "react-bootstrap";

const Footer = () => {
    return (
        <footer className='bg-light border-dark fixed-bottom'  >
            <Row className="m-2">
                Kontakti: yeno@yeno.info. +371 228 228 22. Rēzekne, Varoņu iela 11a.
            </Row>
        </footer>
    );
};

export default Footer;