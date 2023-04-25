// // / <reference types="google.maps" />


// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import type { LatLng, PlacesService, PlaceResult, PlacesServiceStatus } from 'google.maps';




// const Searchresult = () => {
//   const [location, setLocation] = useState({ lat: 35.6895, lng: 139.6917 });
//   const [results, setResults] = useState<PlaceResult[]>([]);
  
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const inputLocation = e.currentTarget.elements.namedItem('location-input') as HTMLInputElement;
//     const searchLocation = inputLocation.value;

//     const service = new (window as any).google.maps.places.PlacesService(
//       document.createElement('div')
//     );

//     const request = {
//       location: new (window as any).google.maps.LatLng(location),
//       radius: 2000,
//       type: ['gym', 'spa'],
//       keyword: searchLocation,
//     };

//     service.nearbySearch(
//       request,
//       (results: PlaceResult[], status: PlacesServiceStatus) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           setResults(results);
//         } else {
//           console.error('Error: ', status);
//         }
//       }
   

//     );
//   };
  

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="location-input"
//           placeholder="地名を入力"
//           // 適切なイベントハンドラを設定して location を更新
//         />
//         <button type="submit">検索</button>
//       </form>
//       <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>

//         <GoogleMap
//           mapContainerStyle={{ width: '100%', height: '400px' }}
//           center={location}
//           zoom={14}
//         >
//           {results.map((result) => (
//             <Marker key={result.place_id} position={result.geometry.location} />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Searchresult;


// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { google } from "google.maps";

// const Searchresult = () => {
//   const [location, setLocation] = useState({ lat: 35.6895, lng: 139.6917 });
//   const [results, setResults] = useState<google.maps.PlaceResult[]>([]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const inputLocation = e.currentTarget.elements.namedItem(
//       "location-input"
//     ) as HTMLInputElement;
//     const searchLocation = inputLocation.value;

//     const service = new window.google.maps.places.PlacesService(
//       document.createElement("div")
//     );
    
//     const request = {
//       location: new window.google.maps.LatLng(location),
//       radius: 2000,
//       type: ["gym", "spa"],
//       keyword: searchLocation,
//     };
    
   

//     service.nearbySearch(
//       request,
//       (
//         results: google.maps.PlaceResult[],
//         status: google.maps.places.PlacesServiceStatus
//       ) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           setResults(results);
//         } else {
//           console.error("Error: ", status);
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="location-input"
//           placeholder="地名を入力"
//           // 適切なイベントハンドラを設定して location を更新
//         />
//         <button type="submit">検索</button>
//       </form>
//       <LoadScript
//         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
//       >
//         <GoogleMap
//           mapContainerStyle={{ width: "100%", height: "400px" }}
//           center={location}
//           zoom={14}
//         >
//           {results.map((result) => (
//             <Marker
//               key={result.place_id}
//               position={result.geometry.location}
//             />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Searchresult;
