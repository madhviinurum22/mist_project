import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading } from "../elements";
import userInfo from "../../data/master/LiveRental.json";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaStopCircle } from "react-icons/fa";


export default function RentalTable({ thead }) {

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


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
                const response = await axios.get(`http://107.22.138.144:8000/api/liverental-list?page=${currentPage}&limit=${itemsPerPage}`);
                console.log(response.data.data);
                setData(response.data.data);
                setFilteredData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage]);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://107.22.138.144:8000/api/meni/open-locks/upload');
                console.log(response.data.data);
                setUserData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const getMobileNumber = (userId) => {
        const user = userData.find(user => user.userId === userId);
        return user ? user.userData.userMobileNumber : 'N/A';
    };
    const handleSearch = (event) => {
        const value = event.target.value.trim();
        setSearchValue(value);

        if (value === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => {
                // Convert mobile number to string for comparison

                const propertyIdAsString = item.propertyId ? item.propertyId.toString() : '';
                return propertyIdAsString.includes(value);
            });
            setFilteredData(filtered);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleDeleteConfirm = () => {
        // Handle the deletion of the item here
        console.log("Deleting item:", selectedItem);
        setShowModal(false);
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
    };

    return (
        <Box className="mc-table-responsive">
            <Input
                type="text"
                className='form-control'
                value={searchValue}
                onChange={handleSearch}
                placeholder='Search by PropertyId'
            /><br />
            {isLoading ? (
                <div>
                    <Lottie
                        options={defaultOptions}
                        height={200}
                        width={200}
                    />
                </div>
            ) : (
                <>
                    {filteredData.length === 0 ? (
                        <p className="text-center mt-3">No user found</p>
                    ) : (
                        <Table striped bordered hover className="mc-table">
                            <thead className="mc-table-head primary">
                                <tr>

                                    {thead.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <Tbody className="mc-table-body even">
                                {currentItems.map((item, index) => (
                                    <Tr key={index}>

                                        <Td title={getMobileNumber(item.userId)}>{getMobileNumber(item.userId)}</Td>
                                        <Td title={item.lockId}>{item.lockId}</Td>
                                        <Td title={item.propertyId}>{item.propertyId}</Td>
                                        <Td title={item.startDate}>{item.startDate}</Td>
                                        <Td title={item.endDate}>{item.endDate}</Td>
                                        <Td title={item.startTime}>{item.startTime}</Td>
                                        <Td title={item.price}>{item.price}</Td>
                                        <Td title={item.type}>{item.type}</Td>
                                        <Td>
                                            <FaStopCircle onClick={() => handleDeleteClick(item)} style={{ cursor: 'pointer' }} />

                                        </Td>
                                        <Modal show={showModal} onHide={handleDeleteCancel} >
                                            <Modal.Header closeButton style={{ marginRight: "30px", marginTop: "15px" }}>

                                            </Modal.Header>
                                            <Modal.Body>Are you sure to delete this ride?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleDeleteConfirm} >
                                                    Yes
                                                </Button>
                                                <Button variant="primary" onClick={handleDeleteCancel} >
                                                    No
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    )}
                    <Box className="mc-paginate">
                        <Text></Text>
                        <div>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="mc-paginate-previous"
                                style={{ marginRight: '10px' }}
                            >
                                <FaChevronLeft />
                            </button>
                            {Array.from({ length: Math.min(totalPages, 100) }).map((_, index) => {
                                const pageNumber = index + 1;
                                const startPage = Math.max(currentPage - 2, 1);
                                const endPage = Math.min(currentPage + 2, totalPages);
                                if (pageNumber >= startPage && pageNumber <= endPage) {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handlePageChange(pageNumber)}
                                            className={`mc-paginate-item ${currentPage === pageNumber ? 'active' : ''}`}
                                            style={{ marginRight: '10px' }}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                }
                                return null;
                            })}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="mc-paginate-next"
                                style={{ marginRight: '10px' }}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </Box>
                </>
            )}



        </Box>
    );
}    