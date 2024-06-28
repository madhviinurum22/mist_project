import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBW1OwSHhc7VHPQbqtbdc7YPUQjDrhPZMU'; 
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

function Addresslist() {
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

  const { latitude, longitude, address, deviceName } = deviceDetails;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
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
  );
}

export default Addresslist;
