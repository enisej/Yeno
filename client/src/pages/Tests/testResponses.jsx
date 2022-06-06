import {Card, Container, Table, Alert} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {usePapaParse} from "react-papaparse";
import {observer} from "mobx-react-lite";
import {fetchByTestId} from "../../http/testAPI";
import {useParams} from "react-router-dom";
import {Context} from "../../index";





const TestResponses = observer(() => {

    const [data, setData ] = useState();
    const {readRemoteFile} = usePapaParse();

    const id = useParams().id
    const {tests} = useContext(Context)

    const [responseLink, setResponseLink] = useState('');
    const validLink = responseLink.replace("/pubhtml", "/pub?output=csv")

    useEffect(() => {
        try {
            fetchByTestId(id).then(data => {
                tests.setTheoryTests(data)
                setResponseLink(tests.tests.responseLink)
            })


            readRemoteFile(validLink, {
                    complete: (results) => {
                        setData(results)
                    }
                }
            )
        }catch {

        }
    }, [readRemoteFile, validLink, id, tests])

    return (
        <Container>
            <Card className="p-3 mt-3 mb-3 shadow">
                <Card.Title className="d-flex justify-content-center ">Iesniegtas atbildes par testu: {tests.tests.title} </Card.Title>
            </Card>
            {data ?
                <Table responsive hover bordered striped>
                    <tbody>
                    {data.data.map((data, index) => (
                        <tr key={index}>
                            {data.map((data, index) =>

                                <td key={index}>
                                    {data}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </Table>
                : <Alert variant="warning" className="d-flex justify-content-center p-3">
                    <Card.Title className="d-flex justify-content-center">Dati netiek atrasti!</Card.Title>
                </Alert>
            }
        </Container>
    );
});

export default TestResponses;