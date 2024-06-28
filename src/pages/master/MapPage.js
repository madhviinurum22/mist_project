

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const MapContainer = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBW1OwSHhc7VHPQbqtbdc7YPUQjDrhPZMU",
  });

  const [deviceList, setDeviceList] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://34.229.162.248:4000/api/total/deviceslist');
        // Convert latitude and longitude strings to numbers
        const formattedDeviceList = response.data.result.map(device => ({
          ...device,
          latitude: parseFloat(device.latitude),
          longitude: parseFloat(device.longitude),
        }));
        setDeviceList(formattedDeviceList);
      } catch (error) {
        console.error('Error fetching result:', error);
        setFetchError(error.message || 'Error fetching data');
      }
    };
    fetchData();
  }, []);

  const center = useMemo(() => ({ lat: 22.72057009914551, lng: 75.85772669176784 }), []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  return (
    <div className="main">
      <div className="main-content">
        <div className="App">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
            {deviceList.map((device, index) => (
              <MarkerF
                key={index}
                position={{ lat: device.latitude, lng: device.longitude }}
                icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
