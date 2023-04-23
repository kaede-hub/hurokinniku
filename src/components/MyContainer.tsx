// import { useEffect, useState } from 'react';
// import { Box, Button, Flex, Text, Image } from '@chakra-ui/react';
// import { Map } from './Map';


// const defaultLatLng = {
//   lat: 35.7022589,
//   lng: 129.7744733,
// };

// const [searchInput, setSearchInput] = useState('');

// const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setSearchInput(event.target.value);
// };

// export const MapContainer = () => {
//   const [location, setLocation] = useState<google.maps.LatLngLiteral>(defaultLatLng);
//   const [isSwitchLocation, setIsSwitchLocation] = useState('off');
//   const [isLoading, setIsLoading] = useState(location === defaultLatLng);


//   const searchNearbyPlaces = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setIsLoading(latitude === defaultLatLng.lat && longitude === defaultLatLng.lng)
//         setLocation({
//           lat: latitude,
//           lng: longitude,
//         });
//       });
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };

//   useEffect(() => {
//     searchNearbyPlaces();
//   }, []);

//   const resetSwitchLocation = () => {
//     setIsSwitchLocation('off');
//   }



//   return (
//     <>
//       <Flex justifyContent="center" alignItems="center" bgColor="#6C9F43" textAlign="center" flexDirection="row">
//         <Box>
//           <Text fontFamily="游ゴシック, YuGothic, sans-serif" color="white" pb={'10px'}>
//             <Image src="/images/marker.png" width={30} height={30} alt="ジム" />
//             がジム
//           </Text>
//         </Box>
//         <Box>
//           <Text fontFamily="游ゴシック, YuGothic, sans-serif" color="white" ml={'10px'}>
//             <Box as="span" color="blue" fontWeight="bold">
//               〇
//             </Box>
//             が温泉・銭湯・サウナ
//           </Text>
//         </Box>
//       </Flex>

//       <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" bgColor="#6C9F43">
//         <Button
//           onClick={() => setIsSwitchLocation('on')}
//           borderRadius="50px"
//           px={20}
//           py={10}
//           bg="#38B6FF"
//           color="white"
//           fontFamily="游ゴシック, YuGothic, sans-serif"
//           cursor="pointer"
//           _hover={{ cursor: 'pointer' }}
//           width="100px"
//           height={'15px'}
//           margin={'5px'}
//         >
//           現在地に戻る
//         </Button>
//         <a href="https://incomparable-centaur-d938f0.netlify.app/home.html" target="_blank" rel="noopener noreferrer">
//           <Button
//             borderRadius="50px"
//             px={20}
//             py={10}
//             bg="#38B6FF"
//             color="white"
//             fontFamily="游ゴシック, YuGothic, sans-serif"
//             cursor="pointer"
//             _hover={{ cursor: 'pointer' }}
//             width="100px"
//             height={'15px'}
//             margin={'5px'}
//           >
//             TOPに戻る
//           </Button>
//         </a>
//       </Box>
//       {!isLoading && <Map location={location} isSwitchLocation={isSwitchLocation} onClickResetSwitch={resetSwitchLocation} />}
//     </>
//   );
// }; 


import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { Map } from "./Map";

const defaultLatLng = {
  lat: 35.7022589,
  lng: 129.7744733,
};




export const MyContainer = () => {
  const [location, setLocation] = useState<google.maps.LatLngLiteral>(
    defaultLatLng
  );
  const [isSwitchLocation, setIsSwitchLocation] = useState("off");
  const [isLoading, setIsLoading] = useState(location === defaultLatLng);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [mapsApi, setMapsApi] = useState<typeof google.maps | null>(null);

  const handleMapLoaded = (map: google.maps.Map, maps: typeof google.maps) => {
    setMapInstance(map);
    setMapsApi(maps);
  };

  const searchNearbyPlaces = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setIsLoading(latitude === defaultLatLng.lat && longitude === defaultLatLng.lng);
        setLocation({
          lat: latitude,
          lng: longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const searchByPlaceName = (keyword: string) => {
    if (mapInstance && mapsApi) {
      const service = new mapsApi.places.PlacesService(mapInstance);
  
      service.textSearch(
        {
          location,
          radius: 1500,
          query: keyword,
        },
        (results, status) => {
          if (status === mapsApi.places.PlacesServiceStatus.OK && results) {
            setSearchResults(results);
          } else {
            setSearchResults([]);
          }
        }
      );
    }
  };
  

  useEffect(() => {
    searchNearbyPlaces();
  }, []);

  const resetSwitchLocation = () => {
    setIsSwitchLocation("off");
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center" bgColor="#6C9F43" textAlign="center" flexDirection="row">
       <Box>
          <Text fontFamily="游ゴシック, YuGothic, sans-serif" color="white" pb={'10px'}>
             <Image src="/images/marker.png" width={30} height={30} alt="ジム" />
         がジム
           </Text>
      </Box>
        <Box>
          <Text fontFamily="游ゴシック, YuGothic, sans-serif" color="white" ml={'10px'}>
        <Box as="span" color="blue" fontWeight="bold">
              〇
        </Box>
             が温泉・銭湯・サウナ
           </Text>
         </Box>
       </Flex>

      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" bgColor="#6C9F43">
         <Button
          onClick={() => setIsSwitchLocation('on')}
          borderRadius="50px"
          px={20}
          py={10}
          bg="#38B6FF"
          color="white"
          fontFamily="游ゴシック, YuGothic, sans-serif"
          cursor="pointer"
          _hover={{ cursor: 'pointer' }}
          width="100px"
          height={'15px'}
          margin={'5px'}
        >
          現在地に戻る
        </Button>
        <a href="https://incomparable-centaur-d938f0.netlify.app/home.html" target="_blank" rel="noopener noreferrer">
          <Button
            borderRadius="50px"
            px={20}
            py={10}
            bg="#38B6FF"
            color="white"
            fontFamily="游ゴシック, YuGothic, sans-serif"
            cursor="pointer"
            _hover={{ cursor: 'pointer' }}
            width="100px"
            height={'15px'}
            margin={'5px'}
          >
            TOPに戻る
          </Button>
        </a>
      </Box>

      {/* Add the input field and search button */}
      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" bgColor="#6C9F43">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="地名を検索 例：東京駅"
        />
        <Button 
         onClick={() => searchByPlaceName(searchKeyword)}
         borderRadius="50px"
         px={20}
         py={10}
         bg="#38B6FF"
         color="white"
         fontFamily="游ゴシック, YuGothic, sans-serif"
         cursor="pointer"
         _hover={{ cursor: 'pointer' }}
         width="100px"
         height={'15px'}
         margin={'5px'}   
          >
          検索
        </Button>
      </Box>

      {/* Add the button to search for nearby facilities */}
      <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" bgColor="#6C9F43">
        <Button 
         onClick={searchNearbyPlaces}
         borderRadius="50px"
         px={20}
         py={10}
         bg="#38B6FF"
         color="white"
         fontFamily="游ゴシック, YuGothic, sans-serif"
         cursor="pointer"
         _hover={{ cursor: 'pointer' }}
         width="200px"
         height={'15px'}
         margin={'5px'}   >
          検索結果周辺のジムとサウナ
        </Button>
        </Box>

      {!isLoading && (
        <Map
          location={location}
          isSwitchLocation={isSwitchLocation}
          onClickResetSwitch={resetSwitchLocation}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          onMapLoaded={handleMapLoaded}
        />
      )}
    </>
  );
};
