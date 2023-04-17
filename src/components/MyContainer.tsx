import { useEffect, useState } from 'react';
import Map from './Map';
import { Button } from '@chakra-ui/react';


export const MapContainer = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const searchNearbyPlaces = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }, null, { enableHighAccuracy: true });
      } else {
        alert('位置情報の許可してください.');
      }
    };
    searchNearbyPlaces();
  }, []);
  

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 129.7744733,
  };

  

  return (
    <>
      
      
      <Map location={location ?? defaultLatLng}/>
    </>
  );
};
function setMap(arg0: (prevMap: any) => any) {
  throw new Error('Function not implemented.');
}

