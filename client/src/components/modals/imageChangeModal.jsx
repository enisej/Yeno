import React, {useContext, useState} from 'react';
import {Alert, Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {updateImage} from "../../http/userAPI";
import {toast} from "react-toastify";
import {Context} from "../../index";



const ImageChangeModal = observer((props) => {


    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [fileSize, setFileSize] = useState(null)
    const [preview, setPreview] = useState(null)

    const selectFile = e => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setFileType(e.target.files[0].type)
        setFileSize(e.target.files[0].size)
    }

    const {user} = useContext(Context)

    const changeImage = async(e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('img', file)
        const id = props.userId


        if(file && fileType === 'image/jpeg' && fileSize < 1000000) {

            const data = await updateImage(id, formData)
            if (data) {
                const notify = () => toast.success('Bilde ir veiksmīgi pamainīta!');
                 notify()
                user.setUser(data)
                window.location.reload(false)
                props.close()
            }
        }else{
            const notify = () => toast.warning('Bilde nav pievienota! Parbaudiet bildes paplāšinājumu un lielumu!');
             notify()
        }

    }
    return (
        <Modal show={props.show}
               size="xl"
               aria-labelledby="contained-modal-title-vcenter"
               centered

        >
                <Modal.Header closeButton onClick={props.close} ></Modal.Header>
            <Form>
            <Modal.Body >
                {file ?
                <Row className='mb-3'>
                    <Col className="d-flex justify-content-center">
                    <Image className="shadow" width={300} height={300} src={preview} alt={file}/>
                </Col>
                </Row>
                    : null}
                <Row>
                    <Col><Alert>Bildēs malu attiecībam jabūt 1:1, bildes lielums nevar parsniegt 10MB!</Alert></Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col ><Form.Control id='file-id' type='file' accept='.png, .jpg, .jpeg' onChange={selectFile} multiple required></Form.Control></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Row className="mt-3">
                    <Col className="d-flex justify-content-center"><Button variant='success' onClick={changeImage} type='submit'>Saglabāt izmaiņas</Button></Col>
                </Row>
            </Modal.Footer>
        </Form>
        </Modal>

    );
});

export default ImageChangeModal;