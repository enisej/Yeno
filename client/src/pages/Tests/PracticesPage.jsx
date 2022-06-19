import React, {useState, useRef, useEffect, useMemo, useCallback, useContext} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {Context} from "../../index";
import {observer} from "mobx-react-lite"; // Optional theme CSS
import { AG_GRID_LOCALE_LV } from "../../utils/locale.lv";
import {deletePractice, fetchPracticeTests} from "../../http/practiceAPI";
import PracticeCreateModal from "../../components/modals/practiceCreateModal";
import PracticeUpdateModal from "../../components/modals/practiceUpdateModal";
import {useHistory} from "react-router-dom";
import {PRACTICE_RESPONSE_ROUTE, USERS_ROUTE} from "../../utils/consts";
import {format, parseISO} from "date-fns";

const PracticesPage = observer(() => {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const history = useHistory();

    const deletePracticeTest = async (id) => {

        const data = await deletePractice(id)
        if(data){
            practices.setPracticeTest(data)
            const notify = () => toast.success(data.message);
            notify()

        }
    }

    // Each Column Definition results in one Column.
    const columnDefs = ([
        {field: 'id', headerName: '#', width: 80},
        {field: 'title', headerName: 'Nosaukums',},
        {field: 'description', headerName: 'Apraksts'},
        {field: 'link', headerName: 'Links'},
        {headerName: 'Izveidots', cellRenderer:(data)=>
                <div>{format(parseISO(data.data.createdAt), 'yyyy/MM/dd')}</div>
            },
        {headerName: 'Rediģēts', cellRenderer:(data)=>
                <div>{format(parseISO(data.data.updatedAt), 'yyyy/MM/dd')}</div>
        },
        {field: 'Actions', headerName: 'Darbības',
            cellRenderer:(data)=>
                <div className="d-flex m-auto mt-1" >
                    <Button variant="outline-warning" className="me-1" onClick={event => {
                        setTestShowUpdate(true)
                        setTestToModal(data.data)
                    }} size="sm"><i className="bi bi-pencil"></i></Button>
                    <Button
                        variant="outline-danger"
                        className="me-1" size="sm"
                        onClick={()=>{
                            deletePracticeTest(data.data.id)
                        }}>
                        <i className="bi bi-trash"></i>
                    </Button>

                </div>},
        {field: 'Results', headerName: 'Rezultāti',
            cellRenderer:(data)=><Button
                variant="outline-success"
                className="me-1" size="sm"
                onClick={()=>{history.push(PRACTICE_RESPONSE_ROUTE + '/' + data.data.id)}}
            >
                <i className="bi bi-archive "></i>
            </Button>},
    ]);


    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    const {practices} = useContext(Context)

    useEffect(() => {
        fetchPracticeTests().then(
            data => {
                setRowData(data)
            }
        )
    }, [practices.practices]);



    const onFirstDataRendered = useCallback((params) => {
        gridRef.current.api.sizeColumnsToFit()
    }, []);

    const [showTestCreate, setTestShowCreate] = useState(false)
    const [showTestUpdate,  setTestShowUpdate] = useState(false)
    const [testToModal, setTestToModal] = useState('')
    return (
        <Container className='d-flex flex-column min-vh-100'>
            <ToastContainer/>
            <Card className="shadow mb-4 mt-3">
                <Card.Body>
                    <Row>
                        <Col sm={9}>
                            <h4 className="fw-bold mt-2">Praktiskie uzdevumi</h4>
                        </Col>
                        <Col>
                            <Button variant="outline-dark" onClick={()=>{history.push(USERS_ROUTE)}}>Lietotāju saraksts</Button>
                        </Col>
                        <Col sm={1}>

                            <Button
                                variant="success"
                                onClick={() => {setTestShowCreate(true);}}
                            ><i className="bi bi-plus-circle"></i>
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine mb-5" style={{width: '100%', height: window.innerHeight}}>
                <AgGridReact
                    localeText={AG_GRID_LOCALE_LV}
                    onFirstDataRendered={onFirstDataRendered}
                    ref={gridRef} // Ref for accessing Grid's API
                    rowData={rowData} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties
                    animateRows={true}// Optional - set to 'true' to have rows animate when sorted// Optional - registering for Grid Event

                />
            </div>

            <PracticeCreateModal
                show={showTestCreate}
                close={()=> setTestShowCreate(false)}
            />
            <PracticeUpdateModal
                practice={testToModal}
                show={showTestUpdate}
                close={()=> setTestShowUpdate(false)}
            />

        </Container>

    );
});

export default PracticesPage;