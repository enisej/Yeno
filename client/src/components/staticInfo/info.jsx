import React from 'react';
import {Card, Col, Row} from "react-bootstrap";

const Info = () => {
    return (
        <Row className="mt-5 mb-5">
            <Col>
                <Card className="h-100 shadow ">
                    <Card.Header>STRATĒGIJA</Card.Header>
                    <Card.Body>
                        Darbadevējam ir vajadzīgi labākie specialisti , līdz ar to bija izstradāta šī vietne ,
                        kurā galvenais mērķis ir atlasīt iespējamos darbiniekus ar testu parbaudi.
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="h-100 shadow">
                    <Card.Header>TESTI</Card.Header>
                    <Card.Body>
                        Ir vairāki testu veidi: Jautājumi ar atbilžu variantiem,
                        patiess vai nepatiess, apraksts ar praktiskiem uzdevumiem, Teksta atbildes uz jautājumiem.
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="h-100 shadow">
                    <Card.Header>VAKANCES</Card.Header>
                    <Card.Body>
                        Ir vienkārši pievienot jauno vakanci. Ir iespēja atslēgt neaktuālo vakanci.
                        Vakances var papildīnāt vai izdzēst.
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="h-100 shadow">
                    <Card.Header>REZULTĀTS</Card.Header>
                    <Card.Body>
                        Tagad pastāv iespēja testēt ispeājamos darbiniekus tiešsaiste
                        izmantojot šo vietni. Vienkārša testu izveide un jauno darbu vakanču pievienošana.
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="h-100 shadow">
                    <Card.Header>ATBALSTS</Card.Header>
                    <Card.Body>
                        Jā jums rodas kaut kādi jautajumi , tad jus varāt atrast kontakt informāciju sadaļa "konktakti"
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    );
};

export default Info;