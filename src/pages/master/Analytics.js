import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { AnalyticsCard } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Item, Anchor } from "../../components/elements";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';
import data from "../../data/master/analytics.json";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function Analytics() {
    const [isLoading, setLoading] = useState(true);
    const [apiData, setApiData] = useState({});
    const [paymentData, setPaymentData] = useState([]);

    var dashboardItems = [
        { name: "Total Users", color: "#afeeee", iconColor: "white", icon: "account_circle", link: "/user-list" },
        { name: "Total Device", color: "#fa8072", icon: "hotel_class" , link: "/Devices"},
        { name: "Total active device", color: "#4682b4", icon: "shopping_bag",link:"/Devices" },
        { name: "Total deactive device", color: "#4682b4", icon: "shopping_bag",link:"/Devices" },
       
    ];
    var dashboardItems1 = [
        {  },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://34.229.162.248:4000/api/admin/total-users');
                console.log("Response Get!" + JSON.stringify(response.data.results));
                setApiData(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
         
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                <Lottie options={defaultOptions} height={200} width={200} />
            </div>
        );
    }

    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={apiData?.breadcrumb?.title}>
                        {apiData?.breadcrumb?.items?.map((item, index) => (
                            <Item key={index} className="mc-breadcrumb-item">
                                {item.path ? (
                                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                                        {item.text}
                                    </Anchor>
                                ) : (
                                    item.text
                                )}
                            </Item>
                        ))}
                    </Breadcrumb>
                </Col>
                {dashboardItems.map((item, index) => (
                    <Col xl={3} key={index}>
                        <a href={item.link}>
                            <AnalyticsCard
                                item={item}
                                value={apiData[item.name.replace(' ', '_').toLowerCase()]}
                                value1={apiData[item.name.replace(' ', '_').toLowerCase() + '_users']}
                                
                                color={item.color}
                                style={{ color: 'white' }}
                            />
                        </a>
                    </Col>
                ))}
             
            </Row>
        </PageLayout>
    );
}
