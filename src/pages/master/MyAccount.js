import React, { useState } from "react";
import { Row, Col, Modal, Table, Button, Form } from "react-bootstrap";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyAccount() {
    const [lockPlans, setLockPlans] = useState([]);
    const [planPrice, setPlanPrice] = useState("");
    const [planType, setPlanType] = useState("");
    // const [imageList, setImageList] = useState([]);
    const [propertyId, setPropertyId] = useState("");
    const [description, setDescription] = useState("");
    const [categoryAddress, setCategoryAddress] = useState("");
    const [categoryCode, setCategoryCode] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categoryImageUrl, setCategoryImageUrl] = useState([]);
    const [categoryName, setCategoryName] = useState("")
    const [lockId, setLockId] = useState("");
    const [model, setModel] = useState("");
    const [hostName, setHostName] = useState("");
    const [propertyLatitude, setPropertyLatitude] = useState("");
    const [macId, setMacId] = useState("");
    const [myProperty, setMyProperty] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    // const handleImageUpload = (event) => {
    //     const files = event.target.files;
    //     const newImageUrls = [];

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             newImageUrls.push(e.target.result);
    //             setImageList((prevImageList) => [...prevImageList, e.target.result]);
    //         };

    //         reader.readAsDataURL(file);
    //     }

    //     setCategoryImageUrl((prevUrls) => [...prevUrls, ...newImageUrls]);
    // };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            propertyId,
            model,
            hostName,
            propertyLatitude,
            myProperty,
            createdAt,
            macId,
            rental: [
                {
                    categoryAddress,
                    categoryCode,
                    categoryId,
                    categoryImage: categoryImageUrl,
                    categoryName,
                    description,
                    lockId,
                    rentalPlans: lockPlans,
                }
            ]
        };

        try {
            const response = await axios.post('http://107.22.138.144:8000/api/user', payload);
            console.log('Response:', response.data);
            navigate('/user-log');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleAddPlan = () => {
        if (planPrice && planType) {
            const newPlan = { price: planPrice, type: planType };
            setLockPlans((prevPlans) => [...prevPlans, newPlan]);
            handleClose();
            setPlanPrice("");

            setPlanType("");
        }
    };

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title="My Account" />
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <TabCard title="Public Information">
                            <Row>
                                <Col xl={12}>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col xl={12}>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Plan Price</th>
                                                            <th>Plan Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lockPlans.map((plan, index) => (
                                                            <tr key={index}>
                                                                <td>{plan.price}</td>
                                                                <td>{plan.type}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                <div>
                                                    <Button className="btn btn-primary my-3" onClick={handleShow}>+Add Plan</Button>
                                                </div>
                                                <Modal show={show} onHide={handleClose} size="lg">
                                                    <Modal.Header closeButton>
                                                        <Modal.Title style={{ paddingTop: '10px', paddingLeft: '15px' }}>Add Plan</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group className="mb-2" controlId="formPlanPrice">
                                                                <Form.Label>Plan Price</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Add Plan Price"
                                                                    value={planPrice}
                                                                    onChange={(e) => setPlanPrice(e.target.value)}
                                                                    required
                                                                />
                                                            </Form.Group>
                                                            <Form.Group className="mb-2" controlId="formPlanType">
                                                                <Form.Label>Plan Type</Form.Label>
                                                                <Form.Control
                                                                    as="select"
                                                                    value={planType}
                                                                    onChange={(e) => setPlanType(e.target.value)}
                                                                    required
                                                                >
                                                                    <option value="" disabled>Select Plan Type</option>
                                                                    <option value="Hourly">Hourly</option>
                                                                    <option value="One-Day">One-Day</option>
                                                                    <option value="Multi-Day">Multi-Day</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer style={{ paddingBottom: '10px' }}>
                                                        <Button
                                                            className="btn btn-primary"
                                                            style={{ paddingBottom: '10px' }}
                                                            onClick={handleAddPlan}
                                                        >
                                                            Add
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter Property ID" type="text" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter Category ID" type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter lockId" type="text" value={lockId} onChange={(e) => setLockId(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter Category Code" type="text" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter Category Name" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter model" type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter hostName" type="text" value={hostName} onChange={(e) => setHostName(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter propertyLatitude" type="text" value={propertyLatitude} onChange={(e) => setPropertyLatitude(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter myProperty" type="text" value={myProperty} onChange={(e) => setMyProperty(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter createdAt" type="text" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Control placeholder="Enter Catogory Address" type="text" value={categoryAddress} onChange={(e) => setCategoryAddress(e.target.value)} />
                                            </Col>



                                        </Row>
                                        <br />
                                        <Col xl={12}>
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <Button className="btn btn-primary mb-3" type="submit">Submit</Button>
                                            </div>
                                        </Col>
                                    </Form>
                                </Col>
                            </Row>
                        </TabCard>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}

