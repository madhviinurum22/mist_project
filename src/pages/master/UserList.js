import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import UsersTable from "../../components/tables/UsersTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userList.json";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';
import UserListCard from '../../components/cards/UserListCard';
import LabelField from "../../components/fields/LabelField";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};




export default function UserList() {
 


    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
               


               
                          
                <Col xl={12}>
                    <CardLayout>
{/*                       
                        <Row xs={1} sm={4} className="mb-4">
                            {data?.filter.map((item, index)=> (
                                <Col key={index}>
                                    <LabelField 
                                        type = { item.type }
                                        label = { item.label }
                                       
                                        placeholder = { item.placeholder }
                                      
                                    /> 
                                </Col>
                            ))}
                        </Row>
                        */}

                        <UsersTable
                            thead={data?.table.thead}
                            
                            tbody={data?.table.tbody}
                        />
                        {/* <Pagination /> */}
                    </CardLayout>
                </Col>

            </Row>
        </PageLayout>
    );
}

