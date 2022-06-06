import React, {useState, useRef, useEffect, useMemo, useCallback, useContext} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {Button, Card, Col, Container, Row} from "react-bootstrap";

import {Context} from "../../index";
import {observer} from "mobx-react-lite"; // Optional theme CSS
import { AG_GRID_LOCALE_LV } from "../../utils/locale.lv";

import {getUsers} from "../../http/userAPI";
import {format, parseISO} from "date-fns";


const UserListPage = observer(() => {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = ([
        {field: 'id', headerName: '#', width: 80},
        {field: 'name', headerName: 'Vārds',},
        {field: 'surname', headerName: 'Uzvārds'},
        {field: 'email', headerName: 'E-pasts'},
        {field: 'tel_number', headerName: 'Talruņis'},
        {headerName: 'Dzimšanas datums', cellRenderer:(data)=>
                <div>{format(parseISO(data.data.birthDate), 'dd/MM/yyyy')}</div>
        },
        {field: 'status', headerName: 'Status'},
        {field: 'cv', headerName: 'CV', cellRenderer:(data)=>
                <Button variant="outline-info" className="me-1" href={'http://' + data.data.cv} size="sm"><i className="bi-info-lg"></i></Button>},
        {field: 'githubLink', headerName: 'GitHub', cellRenderer:(data)=>
                <Button variant="outline-dark" className="me-1" href={'http://' + data.data.githubLink} size="sm"><i className="bi-github"></i></Button>},

    ]);


    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), []);

    const {user} = useContext(Context)

    useEffect(() => {
        getUsers().then(
            data => {
                setRowData(data)
            }
        )
    }, [user.user]);



    const onFirstDataRendered = useCallback((params) => {
        gridRef.current.api.sizeColumnsToFit()
    }, []);

    return (
        <Container className="mt-3 d-flex flex-column min-vh-100">
            <Card className="shadow mb-4 mt-3">
                <Card.Body>
                    <Row>
                        <Col sm={9}>
                            <h4 className="fw-bold mt-2">Lietotāju saraksts</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div className="ag-theme-alpine " style={{width: '100%', height: window.innerHeight}}>
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
        </Container>

    );
});

export default UserListPage;