
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyBW1OwSHhc7VHPQbqtbdc7YPUQjDrhPZMU'; 
// const mapContainerStyle = {
//   width: '100%',
//   height: '450px'
// };

// function DeviceDashboard() {
//   const [deviceDetails, setDeviceDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false); 
//   const { devices_id } = useParams();

//   const fetchStatus = async (devices_id) => {
//     if (!devices_id) {
//       setError('Invalid device ID');
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.get(`http://34.229.162.248:4000/api/total/admin/devicelist/${devices_id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.data.result && response.data.result.length > 0) {
//         setDeviceDetails(response.data.result[0]);
//       } else {
//         setDeviceDetails(null);
//       }
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch data');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (devices_id) {
//       fetchStatus(devices_id);
//     }
//   }, [devices_id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!deviceDetails) {
//     return <div>No data available</div>;
//   }

//   const { lastreporting_time, installation, longitude, latitude, address, moisture, manufacturing, deviceName, messages } = deviceDetails;

//   return (
//     <div style={{ position: 'fixed', backgroundColor: '#E2E1E0', top: '115px', left: '240px', width: 'calc(100% - 240px)', height: 'calc(100% - 110px)', overflow: 'hidden' }}>
//       <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '100vh', overflow: 'auto' }}>
//         <div style={{ padding: '16px', flex: 1 }}>
//           <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
//             <h2 style={{ fontSize: '1.25rem' }}>{deviceName}</h2>
//             <div style={{ display: 'flex', marginTop: '16px' }}>
//               <button style={{ backgroundColor: '#4299e1', color: 'white', fontWeight: '600', padding: '8px 16px', borderRadius: '8px', marginRight: '8px' }}>Dashboard</button>
//               <button style={{ backgroundColor: '#e2e8f0', color: 'black', fontWeight: '600', padding: '8px 16px', borderRadius: '8px', marginRight: '8px' }}>Settings</button>
//               <button style={{ backgroundColor: '#e2e8f0', color: 'black', fontWeight: '600', padding: '8px 16px', borderRadius: '8px' }}>Report history</button>
//             </div>
//           </div>
//           <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', gap: '16px' }}>
//             <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
//               {latitude && longitude ? (
//                 <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//                   <GoogleMap
//                     mapContainerStyle={mapContainerStyle}
//                     center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//                     zoom={15}
//                   >
//                     <Marker
//                       position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//                       icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
//                       onMouseOver={() => setIsInfoWindowOpen(true)}
//                       onMouseOut={() => setIsInfoWindowOpen(false)}
//                     />
//                     {isInfoWindowOpen && (
//                       <InfoWindow
//                         position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//                         onCloseClick={() => setIsInfoWindowOpen(false)}
//                       >
//                         <div>
//                           <h1 className="font-medium text-lg">{deviceName}</h1>
//                           <p>Lat: {latitude}</p>
//                           <p>Lng: {longitude}</p>
//                           <p>Address: {address || 'N/A'}</p>
//                         </div>
//                       </InfoWindow>
//                     )}
//                   </GoogleMap>
//                 </LoadScript>
//               ) : (
//                 <div>No GPS data available</div>
//               )}
//             </div>
//             <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
//               <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
//                 <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Status</h3>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.5rem' }}>
//                   <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Last Report:</h5>
//                   <p style={{ color: '#4b5563' }}>{lastreporting_time}</p>
//                   <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Device installation:</h5>
//                   <p style={{ color: '#4b5563' }}>{installation}</p>
//                   {latitude && longitude && (
//                     <>
//                       <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>GPS Position:</h5>
//                       <p style={{ color: '#4b5563' }}>{latitude}, {longitude}</p>
//                     </>
//                   )}
//                   <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Address:</h5>
//                   <p style={{ color: '#4b5563' }}>{address}</p>
//                   <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Moisture:</h5>
//                   <p style={{ color: '#4b5563' }}>{moisture}</p>
//                   <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Manufacturing:</h5>
//                   <p style={{ color: '#4b5563' }}>{manufacturing}</p>
//                 </div>
//               </div>
//               <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
//                 <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Messages</h3>
//                 {messages && messages.length > 0 ? (
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                     {messages.map((message, index) => (
//                       <div key={index} style={{ backgroundColor: '#edf2f7', padding: '0.75rem', borderRadius: '0.5rem' }}>
//                         <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{message.timestamp}</p>
//                         <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{message.content}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>No messages available</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeviceDashboard;
/////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// const GOOGLE_MAPS_API_KEY = 'AIzaSyBW1OwSHhc7VHPQbqtbdc7YPUQjDrhPZMU'; 
// const mapContainerStyle = {
//   width: '80rem',
//   height: '850px'
// };

// function DeviceDashboard() {
//   const [deviceDetails, setDeviceDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false); 
//   const { devices_id } = useParams();

//   const fetchStatus = async (devices_id) => {
//     if (!devices_id) {
//       setError('Invalid device ID');
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.get(`http://34.229.162.248:4000/api/total/admin/devicelist/${devices_id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (response.data.result && response.data.result.length > 0) {
//         setDeviceDetails(response.data.result[0]);
//       } else {
//         setDeviceDetails(null);
//       }
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch data');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (devices_id) {
//       fetchStatus(devices_id);
//     }
//   }, [devices_id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!deviceDetails) {
//     return <div>No data available</div>;
//   }

//   const { lastreporting_time, installation, longitude, latitude, address, moisture, manufacturing, deviceName, messages } = deviceDetails;

//   return (
//     <div style={{ position: 'fixed', backgroundColor: '#E2E1E0', top: '0', left: '0', width: '100%', height: '100%', overflow: 'hidden' }}>
//       <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
//         <div style={{ flex: 1 }}>
//           {latitude && longitude ? (
//             <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//               <GoogleMap
//                 mapContainerStyle={mapContainerStyle}
//                 center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//                 zoom={15}
//               >
//                 <Marker
//                   position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//                   icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
//                   onMouseOver={() => setIsInfoWindowOpen(true)}
//                   onMouseOut={() => setIsInfoWindowOpen(false)}
//                 />
//                 {isInfoWindowOpen && (
//                   <InfoWindow
//                     position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
//                     onCloseClick={() => setIsInfoWindowOpen(false)}
//                   >
//                     <div>
//                       <h1 className="font-medium text-lg">{deviceName}</h1>
//                       <p>Lat: {latitude}</p>
//                       <p>Lng: {longitude}</p>
//                       <p>Address: {address || 'N/A'}</p>
//                     </div>
//                   </InfoWindow>
//                 )}
//               </GoogleMap>
//             </LoadScript>
//           ) : (
//             <div>No GPS data available</div>
//           )}
//         </div>
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
//           <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
//             <h2 style={{ fontSize: '1.25rem' }}>{deviceName}</h2>
//           </div>
//           <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
//             <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Status</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.5rem' }}>
//               <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Last Report:</h5>
//               <p style={{ color: '#4b5563' }}>{lastreporting_time}</p>
//               <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Device installation:</h5>
//               <p style={{ color: '#4b5563' }}>{installation}</p>
//               {latitude && longitude && (
//                 <>
//                   <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>GPS Position:</h5>
//                   <p style={{ color: '#4b5563' }}>{latitude}, {longitude}</p>
//                 </>
//               )}
//               <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Address:</h5>
//               <p style={{ color: '#4b5563' }}>{address}</p>
//               <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Moisture:</h5>
//               <p style={{ color: '#4b5563' }}>{moisture}</p>
//               <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Manufacturing:</h5>
//               <p style={{ color: '#4b5563' }}>{manufacturing}</p>
//             </div>
//           </div>
//           <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
//             <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Messages</h3>
//             {messages && messages.length > 0 ? (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//                 {messages.map((message, index) => (
//                   <div key={index} style={{ backgroundColor: '#edf2f7', padding: '0.75rem', borderRadius: '0.5rem' }}>
//                     <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{message.lastreporting_time}</p>
                   
//                     <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{message.content}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No messages available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeviceDashboard;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBW1OwSHhc7VHPQbqtbdc7YPUQjDrhPZMU'; 
const mapContainerStyle = {
  width: '80rem',
  height: '850px'
};

function DeviceDashboard() {
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const { devices_id } = useParams();

  const fetchStatus = async (devices_id) => {
    if (!devices_id) {
      setError('Invalid device ID');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`http://34.229.162.248:4000/api/total/admin/devicelist/${devices_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.result && response.data.result.length > 0) {
        setDeviceDetails(response.data.result[0]);
      } else {
        setDeviceDetails(null);
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (devices_id) {
      fetchStatus(devices_id);
    }
  }, [devices_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!deviceDetails) {
    return <div>No data available</div>;
  }

  const { lastreporting_time, installation, longitude, latitude, address, moisture, manufacturing, deviceName, messages } = deviceDetails;

  return (
    <div style={{ position: 'fixed', backgroundColor: '#E2E1E0', top: '0', left: '0', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ flex: 1 }}>
          {latitude && longitude ? (
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                zoom={15}
              >
                <Marker
                  position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                  icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                  onMouseOver={() => setIsInfoWindowOpen(true)}
                  onMouseOut={() => setIsInfoWindowOpen(false)}
                />
                {isInfoWindowOpen && (
                  <InfoWindow
                    position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                    onCloseClick={() => setIsInfoWindowOpen(false)}
                  >
                    <div>
                      <h1 className="font-medium text-lg">{deviceName}</h1>
                      <p>Lat: {latitude}</p>
                      <p>Lng: {longitude}</p>
                      <p>Address: {address || 'N/A'}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          ) : (
            <div>No GPS data available</div>
          )}
        </div>
        <div style={{ flex: 1, flexDirection: 'column', gap: '16px', padding: '16px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
            <h2 style={{ fontSize: '1.25rem' }}>{deviceName}</h2>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Status</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.5rem' }}>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Last Report:</h5>
              <p style={{ color: '#4b5563' }}>{lastreporting_time}</p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Device installation:</h5>
              <p style={{ color: '#4b5563' }}>{installation}</p>
              {latitude && longitude && (
                <>
                  <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>GPS Position:</h5>
                  <p style={{ color: '#4b5563' }}>{latitude}, {longitude}</p>
                </>
              )}
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Address:</h5>
              <p style={{ color: '#4b5563' }}>{address}</p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Moisture:</h5>
              <p style={{ color: '#4b5563' }}>{moisture}</p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Manufacturing:</h5>
              <p style={{ color: '#4b5563' }}>{manufacturing}</p>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Messages</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '0.5rem' }}>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>2/18/2024 2:56 AM</h5>
              <p style={{ color: '#4b5563' }}>{}</p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Kawasaki Mule SX's Battery has fallen below 20.0 percent. Current value: 0.0 percent.</h5>
              <p style={{ color: '#4b5563' }}></p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>2/18/2024 2:56 AM</h5>
              <p style={{ color: '#4b5563' }}>{}</p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Kawasaki Mule SX's Battery has fallen below 20.0 percent. Current value: 0.0 percent.</h5>
              <p style={{ color: '#4b5563' }}></p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>2/18/2024 2:56 AM</h5>
              <p style={{ color: '#4b5563' }}>{}</p>
              <h5 style={{ fontSize: '1rem', fontWeight: '600' }}>Kawasaki Mule SX's Battery has fallen below 20.0 percent. Current value: 0.0 percent.</h5>
              <p style={{ color: '#4b5563' }}></p>
             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDashboard;

