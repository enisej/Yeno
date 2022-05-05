import React from 'react';
import {Badge, Button, Card, Container} from "react-bootstrap";

const MainInfo = () => {
    return (
        <Card className="mt-3 shadow">
            <Container className="d-flex p-xxl-5"  >
                <Container>
                    <h1>
                        PIEVIENOJIES UZŅĒMUMAM JAU TAGAD!
                    </h1>
                    <h4>
                        Vienkārši izvēlies vakanci un izpildi testus
                    </h4>
                </Container>
                <Container className="m-2">
                    <h4 >
                        Tiešsaistes testēšana ar Yeno ir vienkārša. Vienkārši pieteicies vakancei, lai izietu testus.
                        Pēc testu veiksmīgas pabeigšanas ar jums sazināsies uzņēmuma personals. Tiešsaistes viktorīnu
                        un testu parbaude nekad nav bijusi tik vienkārša.

                    </h4>
                    <Badge bg="secondary">By Yeno</Badge>
                </Container>

            </Container>

            <Button variant={"dark"} href="/vacancies">Sākt tagad</Button>
        </Card>
    );
};

export default MainInfo;