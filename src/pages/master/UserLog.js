import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import LabelFieldEmployee from "../../components/fields/LabelFieldEmployee";
import LabelField from "../../components/fields/LabelField";
import UsersLogTable from "../../components/tables/UsersLogTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/UserLog.json";



export default function UserLog() {
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
                        <UsersLogTable
                            thead={data?.table.thead}
                            tbody={data?.table.tbody}

                        />

                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}
