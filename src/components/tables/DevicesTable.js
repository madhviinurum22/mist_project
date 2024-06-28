
// import React, { useState, useEffect } from "react";
// import { Table, Thead, Tbody, Tr, Td } from "../elements/Table";
// import { Button, Input, Anchor, Text, Box } from "../elements";
// import axios from 'axios';
// import Lottie from 'react-lottie';
// import animationData from '../../assets/animations/loading.json';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import Modal from 'react-bootstrap/Modal';
// import { Link } from 'react-router-dom';
// import ReactSwitch from 'react-switch';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Configure default icon for Leaflet
// delete L.Icon.Default.prototype._getIconUrl();

// const defaultCenter = [51.505, -0.09]; // Default center if no devices
// const defaultZoom = 13;

// export default function UsersTable({ thead }) {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [isLoading, setLoading] = useState(true);
//     const [searchValue, setSearchValue] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [deleteId, setDeleteId] = useState(null);
//     const [showDeletePopup, setShowDeletePopup] = useState(false);
//     const [selectedMarker, setSelectedMarker] = useState(null);
//     const [center, setCenter] = useState(defaultCenter);
//     const [zoom, setZoom] = useState(defaultZoom);

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
//                 const response = await axios.get(
//                     `http://34.229.162.248:4000/api/total/deviceslist?page=${currentPage}&limit=${itemsPerPage}`
//                 );
//                 setData(response.data.result);
//                 setFilteredData(response.data.result);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [currentPage, itemsPerPage]);

//     const totalPages = Math.ceil(data.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentItems = filteredData.slice(startIndex, endIndex);

//     const handleSearch = (event) => {
//         const value = event.target.value.trim();
//         setSearchValue(value);

//         if (value === "") {
//             setFilteredData(data);
//         } else {
//             const filtered = data.filter((item) => {
//                 const deviceNameAsString = item.deviceName
//                     ? item.deviceName.toString()
//                     : "";
//                 const latitudeAsString = item.latitude ? item.latitude.toString() : "";
//                 const longitudeAsString = item.longitude ? item.longitude.toString() : "";
//                 return (
//                     deviceNameAsString.includes(value) ||
//                     latitudeAsString.includes(value) ||
//                     longitudeAsString.includes(value)
//                 );
//             });
//             setFilteredData(filtered);
//             // If a single device is found, update the map center and selected marker
//             if (filtered.length === 1) {
//                 const device = filtered[0];
//                 setCenter([device.latitude, device.longitude]);
//                 setSelectedMarker({
//                     latitude: device.latitude,
//                     longitude: device.longitude,
//                     deviceName: device.deviceName
//                 });
//                 setZoom(15); // Optional: Zoom in when a specific device is found
//             } else {
//                 setSelectedMarker(null);
//                 setCenter(defaultCenter);
//                 setZoom(defaultZoom);
//             }
//         }
//         setCurrentPage(1); // Reset current page when searching
//     };

//     const handleChange = async (isChecked, devices_id, index) => {
//         try {
//             await axios.put(
//                 `http://34.229.162.248:4000/user/status/${devices_id}`,
//                 {},
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             const updatedList = [...data];
//             updatedList[index].Status = isChecked ? 1 : 0;
//             setData(updatedList);
//             setFilteredData(updatedList);
//         } catch (error) {
//             console.error("Error toggling status:", error);
//         }
//     };

//     const handlePageChange = (pageNumber) => {
//         if (pageNumber > 0 && pageNumber <= totalPages) {
//             setCurrentPage(pageNumber);
//         }
//     };

//     const handleDelete = async (devices_id) => {
//         try {
//             await axios.delete(
//                 `http://34.229.162.248:4000/api/delete/devices/${devices_id}`
//             );
//             setFilteredData(filteredData.filter((user) => user.devices_id !== devices_id));
//             setData(data.filter((user) => user.devices_id !== devices_id));
//             console.log("Device deleted successfully");
//         } catch (error) {
//             console.error("Error deleting device:", error);
//         } finally {
//             setShowDeletePopup(false);
//         }
//     };

//     const openMap = (latitude, longitude, deviceName) => {
//         setSelectedMarker({ latitude, longitude, deviceName });
//         setCenter([latitude, longitude]);
//         setZoom(15);
//     };

//     return (
//         <Box className="mc-table-responsive">
//             <Input
//                 type="text"
//                 className="form-control"
//                 value={searchValue}
//                 onChange={handleSearch}
//                 placeholder="Search by device name, latitude, or longitude"
//             />
//             <br />
//             {isLoading ? (
//                 <div>
//                     <Lottie options={defaultOptions} height={200} width={200} />
//                 </div>
//             ) : (
//                 <>
//                     {filteredData.length === 0 ? (
//                         <p className="text-center mt-3">No user found</p>
//                     ) : (
//                         <>
//                             <Table striped bordered hover className="mc-table">
//                                 <thead className="mc-table-head primary">
//                                     <tr>
//                                         {thead.map((item, index) => (
//                                             <th key={index}>{item}</th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody className="mc-table-body even">
//                                     {currentItems.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{item.devices_id}</td>
//                                             <td
//                                                 style={{ cursor: "pointer", color: "blue" }}
//                                                 onClick={() =>
//                                                     openMap(item.latitude, item.longitude, item.deviceName)
//                                                 }
//                                             >
//                                                 <Link to={`/dashboard/${item.devices_id}`}>{item.deviceName}</Link>
//                                             </td>
//                                             {/* <td
//                                                 style={{ cursor: "pointer", color: "blue" }}
//                                                 onClick={() => openMap(item.latitude, item.longitude)}
//                                             >
//                                                 <Link to={`/MapPage`}>{item.latitude}</Link>
//                                             </td>
//                                             <td
//                                                 style={{ cursor: "pointer", color: "blue" }}
//                                                 onClick={() => openMap(item.latitude, item.longitude)}
//                                             >
//                                                 <Link to={`/MapPage`}>{item.longitude}</Link>
//                                             </td> */}
//                                             <td
//                                                 style={{ cursor: "pointer", color: "blue" }}
//                                                 onClick={() => openMap(item.address, item.address)}
//                                             >
//                                                 <Link to={`/address/${item.devices_id}`}>{item.address}</Link>
//                                             </td>
//                                             <td>{item.installation}</td>
//                                             <td title={item.Status}>
//                                                 <ReactSwitch
//                                                     checked={item.Status === 1}
//                                                     onChange={(val) =>
//                                                         handleChange(val, item.devices_id, index)
//                                                     }
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <Box className="mc-table-action">
//                                                     <Button
//                                                         title="Delete"
//                                                         className="material-icons delete"
//                                                         onClick={() => {
//                                                             setDeleteId(item.devices_id);
//                                                             setShowDeletePopup(true);
//                                                         }}
//                                                     >
//                                                         {"delete"}
//                                                     </Button>
//                                                     <Anchor
//                                                         to={`/edit-devices/${item.devices_id}`}
//                                                         title="Edit"
//                                                         className="material-icons edit"
//                                                     >
//                                                         {"edit"}
//                                                     </Anchor>
//                                                 </Box>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                             <Box className="mc-paginate">
//                                 <Text></Text>
//                                 <div>
//                                     <button
//                                         onClick={() => handlePageChange(currentPage - 1)}
//                                         disabled={currentPage === 1}
//                                         className="mc-paginate-previous"
//                                         style={{ marginRight: "10px" }}
//                                     >
//                                         <FaChevronLeft />
//                                     </button>
//                                     {Array.from({ length: totalPages }).map((_, index) => {
//                                         const pageNumber = index + 1;
//                                         const startPage = Math.max(currentPage - 2, 1);
//                                         const endPage = Math.min(currentPage + 2, totalPages);
//                                         if (pageNumber >= startPage && pageNumber <= endPage) {
//                                             return (
//                                                 <button
//                                                     key={index}
//                                                     onClick={() => handlePageChange(pageNumber)}
//                                                     className={`mc-paginate-item ${
//                                                         currentPage === pageNumber ? "active" : ""
//                                                     }`}
//                                                     style={{ marginRight: "10px" }}
//                                                 >
//                                                     {pageNumber}
//                                                 </button>
//                                             );
//                                         }
//                                         return null;
//                                     })}
//                                     <button
//                                         onClick={() => handlePageChange(currentPage + 1)}
//                                         disabled={currentPage === totalPages}
//                                         className="mc-paginate-next"
//                                         style={{ marginRight: "10px" }}
//                                     >
//                                         <FaChevronRight />
//                                     </button>
//                                 </div>
//                             </Box>
//                         </>
//                     )}
//                 </>
//             )}

//             <Link to="/analytics" className="btn btn-primary mb-3">
//                 Back
//             </Link>

//             <Modal show={showDeletePopup} onHide={() => setShowDeletePopup(false)}>
//                 <Modal.Header
//                     closeButton
//                     style={{ marginRight: "15px", marginTop: "15px" }}
//                 >
//                     <Modal.Title style={{ marginLeft: "20px" }}>
//                         Delete Confirmation
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to delete this device?</Modal.Body>
//                 <Modal.Footer style={{ marginBottom: "50px" }}>
//                     <Button
//                         style={{ backgroundColor: "blue", borderColor: "blue" }}
//                         onClick={() => setShowDeletePopup(false)}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         style={{ backgroundColor: "red", borderColor: "red" }}
//                         onClick={() => handleDelete(deleteId)}
//                     >
//                         Delete
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Map Component */}
//             {selectedMarker && (
//                 <MapContainer center={center} zoom={zoom}>
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     <Marker position={[selectedMarker.latitude, selectedMarker.longitude]}>
//                         <Popup>{selectedMarker.deviceName}</Popup>
//                     </Marker>
//                 </MapContainer>
//             )}
//         </Box>
//     );
// }
import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Td } from "../elements/Table";
import { Button, Input, Anchor, Text, Box } from "../elements";
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/loading.json';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configure default icon for Leaflet
delete L.Icon.Default.prototype._getIconUrl();

const defaultCenter = [51.505, -0.09]; // Default center if no devices
const defaultZoom = 13;

export default function UsersTable({ thead }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [center, setCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defaultZoom);

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
                const response = await axios.get(
                    `http://34.229.162.248:4000/api/total/deviceslist?page=${currentPage}&limit=${itemsPerPage}`
                );
                console.log('Fetched Data:', response.data.result);
                setData(response.data.result);
                setFilteredData(response.data.result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    const handleSearch = (event) => {
        const value = event.target.value.trim();
        setSearchValue(value);

        if (value === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) => {
                const deviceNameAsString = item.deviceName
                    ? item.deviceName.toString()
                    : "";
                const latitudeAsString = item.latitude ? item.latitude.toString() : "";
                const longitudeAsString = item.longitude ? item.longitude.toString() : "";
                return (
                    deviceNameAsString.includes(value) ||
                    latitudeAsString.includes(value) ||
                    longitudeAsString.includes(value)
                );
            });
            setFilteredData(filtered);
            // If a single device is found, update the map center and selected marker
            if (filtered.length === 1) {
                const device = filtered[0];
                setCenter([device.latitude, device.longitude]);
                setSelectedMarker({
                    latitude: device.latitude,
                    longitude: device.longitude,
                    deviceName: device.deviceName
                });
                setZoom(15); // Optional: Zoom in when a specific device is found
            } else {
                setSelectedMarker(null);
                setCenter(defaultCenter);
                setZoom(defaultZoom);
            }
        }
        setCurrentPage(1); // Reset current page when searching
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleDelete = async (devices_id) => {
        try {
            await axios.delete(
                `http://34.229.162.248:4000/api/delete/devices/${devices_id}`
            );
            setFilteredData(filteredData.filter((user) => user.devices_id !== devices_id));
            setData(data.filter((user) => user.devices_id !== devices_id));
            console.log("Device deleted successfully");
        } catch (error) {
            console.error("Error deleting device:", error);
        } finally {
            setShowDeletePopup(false);
        }
    };

    const openMap = (latitude, longitude, deviceName) => {
        setSelectedMarker({ latitude, longitude, deviceName });
        setCenter([latitude, longitude]);
        setZoom(15);
    };

    return (
        <Box className="mc-table-responsive">
            <Input
                type="text"
                className="form-control"
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search by device name, latitude, or longitude"
            />
            <br />
            {isLoading ? (
                <div>
                    <Lottie options={defaultOptions} height={200} width={200} />
                </div>
            ) : (
                <>
                    {filteredData.length === 0 ? (
                        <p className="text-center mt-3">No user found</p>
                    ) : (
                        <>
                            <Table striped bordered hover className="mc-table">
                                <thead className="mc-table-head primary">
                                    <tr>
                                        {thead.map((item, index) => (
                                            <th key={index}>{item}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="mc-table-body even">
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.devices_id}</td>
                                            <td
                                                style={{ cursor: "pointer", color: "blue" }}
                                                onClick={() =>
                                                    openMap(item.latitude, item.longitude, item.deviceName)
                                                }
                                            >
                                                <Link to={`/dashboard/${item.devices_id}`}>{item.deviceName}</Link>
                                            </td>
                                            <td
                                                style={{ cursor: "pointer", color: "blue" }}
                                                onClick={() => openMap(item.latitude, item.longitude)}
                                            >
                                                <Link to={`/address/${item.devices_id}`}>{item.address}</Link>
                                            </td>
                                            <td>{item.installation}</td>
                                            <td>{item.deviceStatus}</td>
                                            {/* <td
                                                title={item.deviceStatus}
                                                style={{
                                                    color: item.deviceStatus === 1 ? "green" : "red",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {item.deviceStatus === 1 ? "Active" : "Inactive"}
                                            </td> */}
                                            <td>
                                                <Box className="mc-table-action">
                                                    <Button
                                                        title="Delete"
                                                        className="material-icons delete"
                                                        onClick={() => {
                                                            setDeleteId(item.devices_id);
                                                            setShowDeletePopup(true);
                                                        }}
                                                    >
                                                        {"delete"}
                                                    </Button>
                                                    <Anchor
                                                        to={`/edit-devices/${item.devices_id}`}
                                                        title="Edit"
                                                        className="material-icons edit"
                                                    >
                                                        {"edit"}
                                                    </Anchor>
                                                </Box>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Box className="mc-paginate">
                                <Text></Text>
                                <div>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="mc-paginate-previous"
                                        style={{ marginRight: "10px" }}
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    {Array.from({ length: totalPages }).map((_, index) => {
                                        const pageNumber = index + 1;
                                        const startPage = Math.max(currentPage - 2, 1);
                                        const endPage = Math.min(currentPage + 2, totalPages);
                                        if (pageNumber >= startPage && pageNumber <= endPage) {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePageChange(pageNumber)}
                                                    className={`mc-paginate-item ${
                                                        currentPage === pageNumber ? "active" : ""
                                                    }`}
                                                    style={{ marginRight: "10px" }}
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
                                        style={{ marginRight: "10px" }}
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </Box>
                        </>
                    )}
                </>
            )}

            <Link to="/analytics" className="btn btn-primary mb-3">
                Back
            </Link>

            <Modal show={showDeletePopup} onHide={() => setShowDeletePopup(false)}>
                <Modal.Header
                    closeButton
                    style={{ marginRight: "15px", marginTop: "15px" }}
                >
                    <Modal.Title style={{ marginLeft: "20px" }}>
                        Delete Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this device?</Modal.Body>
                <Modal.Footer style={{ marginBottom: "50px" }}>
                    <Button
                        style={{ backgroundColor: "blue", borderColor: "blue" }}
                        onClick={() => setShowDeletePopup(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ backgroundColor: "red", borderColor: "red" }}
                        onClick={() => handleDelete(deleteId)}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Map Component */}
            {selectedMarker && (
                <MapContainer center={center} zoom={zoom}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[selectedMarker.latitude, selectedMarker.longitude]}>
                        <Popup>{selectedMarker.deviceName}</Popup>
                    </Marker>
                </MapContainer>
            )}
        </Box>
    );
}
