import { useEffect, useState, useRef } from 'react';
import Map from './Map';
import { Box, Button, Flex, Text, Image } from '@chakra-ui/react';
import { MapRef } from './Map';
import SearchForm from './SearchForm';



export const MapContainer = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);


  useEffect(() => {
    let watchId: number;

    const searchNearbyPlaces = async () => {
      if (navigator.geolocation) {
        // 監視を開始し、ユーザーの位置が変更されたら位置情報を更新する
        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          null,
          { enableHighAccuracy: true }
        );
      } else {
        alert('位置情報の許可してください.');
      }
    };
    searchNearbyPlaces();

    // クリーンアップ時に位置情報の監視を停止する
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 129.7744733,
  };

  const mapRef = useRef<MapRef | null>(null);

  const goToCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.centerMap(location);
    }
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center" bgColor="#6C9F43" textAlign="center" flexDirection="row">
        <Box>
          <Text
            fontFamily="游ゴシック, YuGothic, sans-serif"
            color="white"
            pb={"10px"}
          >
            <Image
              src="/images/marker.png"
              width={30} height={30}
              alt="ジム" />
            がジム
          </Text>
        </Box>
        <Box>
          <Text
            fontFamily="游ゴシック, YuGothic, sans-serif"
            color="white"
            ml={"10px"}
          >
            <Box as="span" color="blue" fontWeight="bold">
              〇
            </Box>
            が温泉・銭湯・サウナ
          </Text>

        </Box>
      </Flex>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        bgColor="#6C9F43"
      >
        <Button
          onClick={goToCurrentLocation}
          borderRadius="50px"
          px={20}
          py={10}
          bg="#38B6FF"
          color="white"
          fontFamily="游ゴシック, YuGothic, sans-serif"
          cursor="pointer"
          _hover={{ cursor: "pointer" }}
          width="100px"
          height={"15px"}
          margin={"5px"}
        >
          現在地に戻る
        </Button>
        <SearchForm />
      </Box>
      <Map location={location ?? defaultLatLng} />
    </>
  );
};


