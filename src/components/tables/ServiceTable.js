import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Anchor, Box, Text } from "../elements";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';
import { Link } from 'react-router-dom';
export default function ServiceTable() {
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
                const response = await axios.get('http://52.87.174.216:8080/api/user/servicelist');
                setUsers(response.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Box className="mc-table-responsive"><br />
            <Link to="/add-services" className="btn btn-primary mb-3" >Add Services+</Link>
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>

                {isLoading ? (
                    <Tbody>
                        <Tr>
                            <Td colSpan="3">
                                <Lottie
                                    options={defaultOptions}
                                    height={200}
                                    width={200}
                                />
                            </Td>
                        </Tr>
                    </Tbody>
                ) : (
                    <Tbody className="mc-table-body even">
                        {users.map((item, index) => (
                            <Tr key={index}>
                                <Td>{item.servicestype_id_PK}</Td>

                                <td>{item.name}</td>

                                <Td>
                                    <Box className="mc-table-action">
                                        {/* <Anchor href="" title="View" className="material-icons view">{"visibility"}</Anchor>
                                        
                                        {/* <Button title="Block" className="material-icons delete"><DeleteIcon/></Button> */}
                                                          <Anchor to={`/edit-service/${item.servicestype_id_PK}`} title="Edit" className="material-icons edit">{"edit"}</Anchor>

                                    
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                        <br />
                        <Link to="/analytics" className="btn btn-primary mb-3" >Back</Link>


                    </Tbody>
                )}
            </Table>
        </Box>
    );
}
