import React from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import LabelField from "../../components/fields/LabelField";
import DevicesTable from "../../components/tables/DevicesTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/devices.json";

export default function Devices() {
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
               
               
                           
                        </Row>
                        <DevicesTable
                            thead = { data?.table.thead }
                            tbody = { data?.table.tbody }
                        />
                        <Pagination />
                    
                
        </PageLayout>
    );
}