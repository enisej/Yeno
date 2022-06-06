import React, {useContext, useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Col,
    Container, DropdownButton,
    Form, FormControl,
    Image,
    Row
} from "react-bootstrap";
import icon from "bootstrap-icons/icons/clock-fill.svg";
import {observer} from "mobx-react-lite";
import {format, parseISO} from "date-fns";
import VacancyCreateModal from "../modals/vacancyCreateModal";
import {
    deleteVacancy,
    fetchAllVacancies,
    sortVacancyByDate,
    sortVacancyByName,
    sortVacancyByStatus
} from "../../http/vacanciesAPI";
import VacancyUpdateModal from "../modals/vacancyUpdateModal";
import VacancyModalItem from "../modals/vacancyModalItem";
import {toast, ToastContainer} from "react-toastify";

import NotFound from "../alerts/NotFound";
import {Context} from "../../index";
import DropdownItem from "react-bootstrap/DropdownItem";


const AdminVacancyItem = observer( () => {
    const [showDetails, setShowDetails] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [vacancy, setVacancy] = useState('');
    const [rowData, setRowData] = useState();

    const deleteVacancyItem = async (id) => {
        const data = await deleteVacancy(id)
        if(data){
            vacancies.setVacancies(data)
            const notify = () => toast.success(data.message);
            notify()
        }
    }

    const {vacancies} = useContext(Context)


    useEffect(() => {
        fetchAllVacancies(vacancies.page, 5).then(data => {
                //vacancies.setVacancies(data.rows)
                vacancies.setTotalCount(data.count);
                setRowData(data.rows);
        })
    }, [vacancies.vacancies, vacancies])


    const Cancel = () => {
        fetchAllVacancies(vacancies.page, 5).then(data => {
            
            vacancies.setTotalCount(data.count);
            setRowData(data.rows);
        })

    }


    const sortByNameASC = () => {
         sortVacancyByName(vacancies.page, 5, 'ASC').then(data => {

             vacancies.setTotalCount(data.count);
            setRowData(data.rows)
        })

    }

    const sortByNameDESC = () => {
        sortVacancyByName(vacancies.page, 5, 'DESC').then(data => {

            vacancies.setTotalCount(data.count);
            setRowData(data.rows)
        })

    }

    const sortByDateASC = async () => {
        await sortVacancyByDate(vacancies.page, 5, 'ASC').then(data => {

            vacancies.setTotalCount(data.count);
            setRowData(data.rows)

        })
    }

    const sortByDateDESC = async () => {
        await sortVacancyByDate(vacancies.page, 5, 'DESC').then(data => {

            vacancies.setTotalCount(data.count);
            setRowData(data.rows)

        })
    }

    const sortByStatusASC = async () => {
        await sortVacancyByStatus(vacancies.page, 5, 'ASC').then(data => {

            vacancies.setTotalCount(data.count);
            setRowData(data.rows)
        })
    }

    const sortByStatusDESC = async () => {
        await sortVacancyByStatus(vacancies.page, 5, 'DESC').then(data => {

            vacancies.setTotalCount(data.count);
            setRowData(data.rows)
        })
    }


    return (
        <Container className="mt-xxl-5">
            <ToastContainer/>

            <Card className="shadow">
                <Card.Body>
                    <Row>
                        <Col sm={1}>
                            <Button
                                variant="outline-info"
                                onClick={() => {
                                    setVacancy(vacancy)
                                    setShowCreate(true);
                                }}
                            ><i className="bi bi-plus-circle"></i>
                            </Button>
                        </Col>
                        <Col>
                            <DropdownButton variant='secondary' title='Kārtot'>
                                <DropdownItem onClick={e=>{Cancel()}}>
                                    Atcelt
                                </DropdownItem>
                                <DropdownItem
                                    onClick={e=>{sortByNameASC() }}>Pēc nosaukuma <i className="bi-arrow-up"></i>
                                </DropdownItem>
                                <DropdownItem onClick={e=>{sortByNameDESC()}}>
                                    Pēc nosaukuma <i className="bi-arrow-down"></i>
                                </DropdownItem>
                                <DropdownItem onClick={e=>{sortByDateASC()}}>
                                    Pēc izveides datuma <i className="bi-arrow-up"></i>
                                </DropdownItem>
                                <DropdownItem onClick={e=>{sortByDateDESC()}}>
                                    Pēc izveides datuma <i className="bi-arrow-down"></i>
                                </DropdownItem>
                                <DropdownItem onClick={e=>{sortByStatusASC()}}>
                                    Pēc statusa <i className="bi-arrow-up"></i>
                                </DropdownItem>
                                <DropdownItem onClick={e=>{sortByStatusDESC()}}>
                                    Pēc statusa <i className="bi-arrow-down"></i>
                                </DropdownItem>
                            </DropdownButton>
                        </Col>
                        <Col>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Meklēšana..."
                                    className="me-2"
                                    aria-label="Search"

                                />
                                <Button variant="outline-success"><i className="bi-search"></i></Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {rowData ?
                <div>
                    {rowData.map(vacancy =>
                        <Card className="mt-5 shadow" key={vacancy.id}>

                            <Card.Body>
                                <Row className="justify-content-md-center">
                                    <Col sm>
                                        <Card.Title className="fs-1 mb-5 ">{vacancy.title}

                                        </Card.Title>
                                        <Card.Text> <Image src={icon}
                                                           alt="clock"/> {format(parseISO(vacancy.updatedAt), 'yyyy/MM/dd')}
                                        </Card.Text>

                                    </Col>
                                    <Col className="col-lg-3 d-flex mt-3 mb-3 me-lg-5">
                                        <Button variant="outline-info" className="align-self-center shadow m-1"
                                                onClick={() => {

                                                    setVacancy(vacancy)
                                                    setShowDetails(true);
                                                }}><i className="bi-info-lg"></i></Button>
                                        <Button
                                            variant="warning"
                                            className="align-self-center shadow m-1"
                                            onClick={() => {
                                                setShowUpdate(true);
                                                setVacancy(vacancy)
                                            }}
                                        ><i className="bi-pencil"></i>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="align-self-center shadow m-1"
                                            onClick={e => {
                                                deleteVacancyItem(vacancy.id)
                                            }}
                                        >
                                            <i className="bi-trash"></i>
                                        </Button>

                                    </Col>
                                    <Col sm={1}>
                                        Status:
                                        {vacancy.status === true ?
                                            <Badge className="align-self-center shadow m-1 text-success" pill
                                                   bg="success">!</Badge>
                                            :
                                            <Badge className="align-self-center shadow m-1 text-danger" pill
                                                   bg="danger">!</Badge>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </div>
                :
                <NotFound/>
            }
            <VacancyModalItem
                icon = {icon}
                vacancy={vacancy}
                show={showDetails}
                close={() => setShowDetails(false)}/>


            <VacancyCreateModal
                vacancy={vacancy}
                show={showCreate}
                close={() => setShowCreate (false)}/>

            <VacancyUpdateModal
                show={showUpdate}
                vacancy={vacancy}
                close={()=> setShowUpdate(false)}
            />


        </Container>
    );
});

export default AdminVacancyItem;