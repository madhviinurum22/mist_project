
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor } from "../../components/elements";
import { LabelField } from "../../components/fields";
import { CardLayout } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/AddProperty.json";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddProperty() {
    const navigate = useNavigate();

    const [Name, setUserName] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: Name,
        };

        try {
            console.log("Service added successfully");
            const response = await axios.post('http://localhost:8080/upload-image', payload, {

            });

            if (response.status === 200) {
                const responseData = response.data;
                if (responseData.message === "Service added successfully") {
                    console.log("Service added successfully");
                    console.log("Inserted ID:", responseData.insertedId);
                    localStorage.setItem('message', JSON.stringify(responseData));
                    navigate('/user-log');
                } else {
                    console.error('Error:', responseData.message);
                }
            } else {
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };



    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={index} className="mc-breadcrumb-item">
                                    {item.path ? (
                                        <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor>
                                    ) : (
                                        item.text
                                    )}
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>

                <Col xl={12}>
                    <CardLayout className="mb-4">
                        <Row>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField
                                        type="text"
                                        label="Add Services"
                                        fieldSize="w-100 h-sm"
                                        value={Name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField
                                        type="text"
                                        label="Add Services"
                                        fieldSize="w-100 h-sm"
                                        value={Name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField
                                        type="text"
                                        label="Add Services"
                                        fieldSize="w-100 h-sm"
                                        value={Name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField
                                        type="text"
                                        label="Add Services"
                                        fieldSize="w-100 h-sm"
                                        value={Name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField
                                        type="text"
                                        label="Add Services"
                                        fieldSize="w-100 h-sm"
                                        value={Name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                            </Col>
                            <Col xl={4}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField
                                        type="text"
                                        label="Add Services"
                                        fieldSize="w-100 h-sm"
                                        value={Name}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </Box>
                            </Col>
                        </Row>
                        {/* <Anchor
                            className="btn btn-primary mb-3"
                            text="Submit"
                            onClick={handleSubmit} 
                        /> */}
                        <Col xl={12}>

                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button className="btn btn-primary mb-3" type="submit" onClick={handleSubmit}> Submit </button>
                            </div>

                        </Col>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}
