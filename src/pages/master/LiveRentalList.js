import React, { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import RentalTable from "../../components/tables/LiveRentalTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/LiveRental.json";
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




export default function LiveRentalList() {
    


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
                     
                        <RentalTable
                            thead = { data?.table.thead }
                            tbody = { data?.table.tbody }
                        />
                 
                    </CardLayout>
                </Col>

            </Row>
        </PageLayout>
    );
}

