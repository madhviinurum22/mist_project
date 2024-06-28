import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading } from "../elements";
import axios from 'axios';
import Lottie from 'react-lottie';



export default function AnalyticsTable({ thead }) {
    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr>

                        {thead.map((item, index) => (
                            <Th key={index}>{item}</Th>
                        ))}
                    </Tr>
                </Thead>

                {isLoading ? (
                    <div>
                        <Lottie
                            options={defaultOptions}
                            height={200}
                            width={200}
                        />
                    </div>
                ) : (
                    <Tbody className="mc-table-body even">
                        {data.map((item, index) => (
                            <Tr key={index}>
                                <Td title={item.total_users}>{item.total_users}</Td>
                                <Td title={item.total_device}>{item.total_device}</Td>
                                <Td title={item.total_active}>{item.total_active}</Td>
                                <Td title={item.total_inactive}>{item.total_inactive}</Td>
                            
                               
                            </Tr>
                        ))}

                    </Tbody>
                )}
            </Table>
        </Box>
    );
}
