
import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Input, Text, Box, Anchor } from "../elements";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export default function UsersTable({ thead }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

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
                const response = await axios.get(`http://34.229.162.248:4000/api/total/userlist?page=${currentPage}&limit=${itemsPerPage}`);
                console.log(response.data.result);
                setData(response.data.result);
                setFilteredData(response.data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handleSearch = (event) => {
        const value = event.target.value.trim();
        setSearchValue(value);
      
        if (value === '') {
          setFilteredData(data);
        } else {
          const filtered = data.filter((item) => {
            const firstnameAsString = item.firstname ? item.firstname.toString() : '';
            return firstnameAsString.includes(value);
          });
          setFilteredData(filtered);
        }
    };
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (email) => {
        try {
            await axios.delete(`http://localhost:4000/api/delete/users/${email}`);
            setFilteredData(filteredData.filter(user => user.userId !== email));
            setData(data.filter(user => user.userId !== email));
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setShowDeletePopup(false); 
        }
    };

    return (
        <Box className="mc-table-responsive">
            <Input
                type="text"
                className='form-control'
                value={searchValue}
                onChange={handleSearch}
                placeholder='Search by Firstname'
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
                                    <td title="serial-number">
              <Box className="mc-table-check">
                <Text>{index + 1}</Text>
              </Box>
            </td>
                                        <Td title={item.type_of_building}>{item.type_of_building}</Td>
                                        <td title={`${item.firstname} ${item.lastname}`}>
              <Box className="mc-table-check">
                <Text>{`${item.firstname} ${item.lastname}`}</Text>
              </Box>
            </td>
                                        
            <td title={item.device_name} style={{ cursor: 'pointer', color: 'blue' }}>
        <Link to={`/Devices`}>
          {item.device_name}
        </Link>
      </td>
                                        <Td title={item.device_name}>{item.email}</Td>
                                        <Td>
                                    <Box className="mc-table-action">
                                    <Button
                                                    title="Delete"
                                                    className="material-icons delete"
                                                    onClick={() => {
                                                        setDeleteId(item.userId);
                                                        setShowDeletePopup(true);
                                                    }}
                                                >
                                                    {"delete"}
                                                </Button>
                                                <Anchor
                                                        to={`/edit-user/${item.email}`}
                                                        title="Edit"
                                                        className="material-icons edit"
                                                    >
                                                        {"edit"}
                                                    </Anchor>
                                        
                                    </Box>
                                 
                                </Td>
                                     
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

            <Link to="/analytics" className="btn btn-primary mb-3">Back</Link>

            <Modal show={showDeletePopup} onHide={() => setShowDeletePopup(false)}>
                <Modal.Header closeButton style={{ marginRight: "15px", marginTop: "15px" }}>
                    <Modal.Title style={{ marginLeft: "20px" }}> Delete Confirmation </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>
                <Modal.Footer style={{ marginBottom: "50px" }}>
                    <Button variant="secondary" onClick={() => setShowDeletePopup(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => handleDelete(deleteId)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}
