import React from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import ServiceTable from "../../components/tables/ServiceTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/service.json";

export default function Service() {
    
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
                        <ServiceTable
                            thead = { data?.table.thead }
                            tbody = { data?.table.tbody }
                        />
                        <Pagination />
                    
                
        </PageLayout>
    );
}