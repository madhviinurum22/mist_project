// import React, { useState, useEffect } from "react";
// import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
// import { Input, Box, Text } from "../elements";
// import axios from 'axios';
// import Lottie from 'react-lottie';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import animationData from '../../assets/animations/loading.json';

// export default function UsersLogTable({ thead }) {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [isLoading, setLoading] = useState(true);
//     const [searchValue, setSearchValue] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(5);

//     const defaultOptions = {
//         loop: true,
//         autoplay: true,
//         animationData: animationData,
//         rendererSettings: {
//             preserveAspectRatio: "xMidYMid slice"
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`http://107.22.138.144:8000/api/users?page=${currentPage}&limit=${itemsPerPage}`);
//                 setData(response.data.data);
//                 setFilteredData(response.data.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [currentPage, itemsPerPage]);

//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
//     const currentItems = filteredData.slice(startIndex, endIndex);

//     const handleSearch = (event) => {
//         const value = event.target.value.toLowerCase().trim();
//         setSearchValue(value);

//         if (value === '') {
//             setFilteredData(data);
//         } else {
//             const filtered = data.filter((item) => {


//                 const propertyIdAsString = item.propertyId ? item.propertyId.toString() : '';
//                 return propertyIdAsString.includes(value);
//             });
//             setFilteredData(filtered);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     return (
//         <Box className="mc-table-responsive">
//             <Input
//                 type="text"
//                 className='form-control'
//                 value={searchValue}
//                 onChange={handleSearch}
//                 placeholder='Search by PropertyId'
//             /><br />
//             <Table className="mc-table">
//                 <Thead className="mc-table-head primary">
//                     <Tr>
//                         {thead.map((item, index) => (
//                             <Th key={index}>{item}</Th>
//                         ))}
//                     </Tr>
//                 </Thead>
//                 <Tbody className="mc-table-body even">
//                     {isLoading ? (
//                         <tr>
//                             <Td colSpan={thead.length} style={{ textAlign: 'center' }}>
//                                 <Lottie
//                                     options={defaultOptions}
//                                     height={200}
//                                     width={200}
//                                 />
//                             </Td>
//                         </tr>
//                     ) : (
//                         currentItems.map((item, index) => (
//                             <Tr key={index}>
//                                 <Td>{item.propertyId}</Td>
//                                 <Td>{item.myProperty}</Td>
//                                 <Td>{item.rental && item.rental.length > 0 ? item.rental[0].lockId : ''}</Td>
//                                 <Td>{item.rental && item.rental.length > 0 ? item.rental[0].description : ''}</Td>
//                                 <Td>{item.rental && item.rental.length > 0 ? item.rental[0].categoryAddress : ''}</Td>
//                                 <Td>{item.rental && item.rental.length > 0 ? item.rental[0].categoryCode : ''}</Td>
//                                 <Td>{item.rental && item.rental.length > 0 ? item.rental[0].categoryName : ''}</Td>
//                                 <Td>
//                                     {item.rental && item.rental.length > 0 && item.rental[0].rentalPlans.map((plan, i) => (
//                                         <div key={i}>{plan.type}</div>
//                                     ))}
//                                 </Td>
//                                 <Td>
//                                     {item.rental && item.rental.length > 0 && item.rental[0].rentalPlans.map((plan, i) => (
//                                         <div key={i}>{plan.price}</div>
//                                     ))}
//                                 </Td>
//                             </Tr>
//                         ))
//                     )}
//                 </Tbody>
//             </Table>
//             <Box className="mc-paginate">
//                 <Text></Text>
//                 <div>
//                     <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="mc-paginate-previous"
//                         style={{ marginRight: '10px' }}
//                     >
//                         <FaChevronLeft />
//                     </button>
//                     {Array.from({ length: Math.min(totalPages, 100) }).map((_, index) => {
//                         const pageNumber = index + 1;
//                         const startPage = Math.max(currentPage - 2, 1);
//                         const endPage = Math.min(currentPage + 2, totalPages);
//                         if (pageNumber >= startPage && pageNumber <= endPage) {
//                             return (
//                                 <button
//                                     key={index}
//                                     onClick={() => handlePageChange(pageNumber)}
//                                     className={`mc-paginate-item ${currentPage === pageNumber ? 'active' : ''}`}
//                                     style={{ marginRight: '10px' }}
//                                 >
//                                     {pageNumber}
//                                 </button>
//                             );
//                         }
//                         return null;
//                     })}
//                     <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="mc-paginate-next"
//                         style={{ marginRight: '10px' }}
//                     >
//                         <FaChevronRight />
//                     </button>
//                 </div>
//             </Box>
//         </Box>
//     );
// }

import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Input, Box, Text } from "../elements";
import axios from 'axios';
import Lottie from 'react-lottie';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import animationData from '../../assets/animations/loading.json';
import { Link } from 'react-router-dom';

export default function UsersLogTable({ thead }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

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
                const response = await axios.get(`http://107.22.138.144:8000/api/users?page=${currentPage}&limit=${itemsPerPage}`);
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
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase().trim();
        setSearchValue(value);

        if (value === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => {
                const propertyIdAsString = item.propertyId ? item.propertyId.toString() : '';
                return propertyIdAsString.includes(value);
            });
            setFilteredData(filtered);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Box className="mc-table-responsive">
             <Link to="/add-property" className="btn btn-primary mb-3" >Add Property +</Link>
            <Input
                type="text"
                className='form-control'
                value={searchValue}
                onChange={handleSearch}
                placeholder='Search by PropertyId'
            /><br />
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
                    <Tr>
                        {thead.map((item, index) => (
                            <Th key={index}>{item}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {isLoading ? (
                        <tr>
                            <Td colSpan={thead.length} style={{ textAlign: 'center' }}>
                                <Lottie
                                    options={defaultOptions}
                                    height={200}
                                    width={200}
                                />
                            </Td>
                        </tr>
                    ) : (
                        currentItems.map((item, index) => (
                            <Tr key={index}>
                                <Td>{item.propertyId}</Td>
                                <Td>{item.myProperty}</Td>
                                <Td>{item.rental && item.rental.length > 0 ? item.rental[0].lockId : ''}</Td>
                                <Td>{item.rental && item.rental.length > 0 ? item.rental[0].description : ''}</Td>
                                <Td>{item.rental && item.rental.length > 0 ? item.rental[0].categoryAddress : ''}</Td>
                                <Td>{item.rental && item.rental.length > 0 ? item.rental[0].categoryCode : ''}</Td>
                                <Td>{item.rental && item.rental.length > 0 ? item.rental[0].categoryName : ''}</Td>
                                <Td>
                                    {item.rental && item.rental.length > 0 && Array.isArray(item.rental[0].rentalPlans) 
                                        ? item.rental[0].rentalPlans.map((plan, i) => (
                                            <div key={i}>{plan.type}</div>
                                        ))
                                        : ''
                                    }
                                </Td>
                                <Td>
                                    {item.rental && item.rental.length > 0 && Array.isArray(item.rental[0].rentalPlans) 
                                        ? item.rental[0].rentalPlans.map((plan, i) => (
                                            <div key={i}>{plan.price}</div>
                                        ))
                                        : ''
                                    }
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
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
        </Box>
    );
}
