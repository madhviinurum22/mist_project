import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Anchor, Button } from "../../components/elements";
import { LabelField } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/edituser.json";
import { useParams, useNavigate } from 'react-router-dom';

export default function Edituser() {
    const { email } = useParams();
    const [serviceData, setServiceData] = useState({});
    const navigate = useNavigate();



    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://34.229.162.248:4000/api/user/${email}`, serviceData);
            console.log('Update successful', response.data.data);
            console.log("update id", email);
            navigate('/user-list');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const handleFocus = (event) => {
        const { name } = event.target;
        setServiceData({ ...serviceData, [name]: '' });
    };

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="Basic Information" dotsMenu={data?.dotsMenu} />
                        <Row>
                            <Col xl={12}>
                                <LabelField
                                    type="text"
                                    label="type of building"
                                    name="type_of_building"
                                    value={serviceData.type_of_building || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    fieldSize="w-100 h-md"
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelField
                                    type="text"
                                    label="device name"
                                    name="device_name"
                                    value={serviceData.device_name || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    fieldSize="w-100 h-md"
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelField
                                    type="text"
                                    label="firstname"
                                    name="firstname"
                                    value={serviceData.firstname || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    fieldSize="w-100 h-md"
                                />
                            </Col>
                            <Col xl={12}>
                                <LabelField
                                    type="text"
                                    label="lastname"
                                    name="lastname"
                                    value={serviceData.lastname || ''}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                    fieldSize="w-100 h-md"
                                />
                            </Col>
                       
                        </Row>
                    </CardLayout>
                </Col>
            </Row>
            <Col xl={12}>
                <CardLayout>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            className="btn btn-primary mb-3"
                            onClick={handleUpdate}
                            type="button"
                        >
                            Update
                        </Button>
                    </div>
                </CardLayout>
            </Col>
        </PageLayout>
    );
}
