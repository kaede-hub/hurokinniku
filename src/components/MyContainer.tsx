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
  // useEffect(() => {
    // 現在地の取得
    // TODO: やや不安定なので改善する
  //   const searchNearbyPlaces = async () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(async (position) => {
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },null, { enableHighAccuracy: true });
  //     } else {
  //       alert("位置情報の許可してください.");
  //     }
  //   };
  //   searchNearbyPlaces();
  // }, [])
  

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 129.7744733,
  };



  return (
    <>
      {/* {showButton && ( */}
        {/* <Button
          colorScheme="blue"
          position="absolute"
          top="50px"
          right="50px"
          zIndex={1}
          onClick={handleReturnToCurrentLocation}
        >
          現在地に戻る
        </Button> */}
      {/* )} */}
      <Map location={location ?? defaultLatLng}/>
    </>
  );
};
