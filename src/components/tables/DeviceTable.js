import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading } from "../elements";
import userInfo from "../../data/master/UserLog.json";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';


export default function DeviceTable({ thead, tbody }) {

    const [data, setData] = useState([]);
    const [userData, setUserData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    const [blockModal, setBlockModal] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-devices');
                console.log(response.data.data);
                setUsers(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    useEffect(() => { setData(tbody) }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data?.map((item) => {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) =>
                item.name === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    }

    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>
                            <Box className="mc-table-check">

                                <Text>uid</Text>
                            </Box>
                        </Th>
                        {thead.map((item, index) => (
                            <Th key={index}>{item}</Th>
                        ))}
                    </Tr>
                </Thead>

                {isLoading ? (<div>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                </div>) :
                    (<Tbody className="mc-table-body even">
                        {users?.map((item, index) => (
                            <Tr key={index}>
                                <Td title="id">
                                    <Box className="mc-table-check">
                                      
                                        <Text>#{item.id}</Text>
                                    </Box>
                                </Td>
                                <Td title={item.name}>
                                    <Box className="mc-table-profile">
                                        <Text>{item.device_name}</Text>
                                    </Box>
                                </Td>

                                <Td title={item.Mac_address}>{item.Mac_address}</Td>
                                <Td title={item.Latitude}>{item.Latitude}</Td>
                                <Td title={item.Longitude}>{item.Longitude}</Td>
                                <Td title={item.Temperature}>{item.Temperature}</Td>
                                <Td title={item.Status}>{item.Status}</Td>
                                <Td title={item.Moisture}>{item.Moisture}</Td>
                                <Td>
                                    <Box className="mc-table-action">
                                        <Anchor href="/user-profile" title="View" className="material-icons view">{"visibility"}</Anchor>
                                        <Button title="Edit" className="material-icons edit">{"edit"}</Button>
                                        <Button title="Block" className="material-icons block">{"block"}</Button>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>)
                }
            </Table>

            <Modal show={editModal} onHide={() => setEditModal(false, setUserData(""))}>
                <Box className="mc-user-modal">
                    <Image src={userData.src} alt={userData?.alt} />
                    <Heading as="h4">{userData?.name}</Heading>
                    <Text as="p">{userData?.email}</Text>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>role</Form.Label>
                        <Form.Select>
                            <Option>{userData?.role ? userData?.role.text : ""}</Option>
                            {userInfo.role.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="form-group inline">
                        <Form.Label>status</Form.Label>
                        <Form.Select>
                            <Option>{userData?.status}</Option>
                            {userInfo.status.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setEditModal(false)}>close popup</Button>
                        <Button type="button" className="btn btn-success" onClick={() => setEditModal(false)}>save Changes</Button>
                    </Modal.Footer>
                </Box>
            </Modal>

            <Modal show={blockModal} onHide={() => setBlockModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to block this user's account?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setBlockModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => setBlockModal(false)}>yes, block</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    )
}




