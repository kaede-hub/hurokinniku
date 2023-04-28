import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import GoogleMapReact, { ClickEventValue, Coords } from "google-map-react";
import styled from "styled-components";


interface Props {
  location: google.maps.LatLngLiteral;
  isSwitchLocation: string;
  onClickResetSwitch: () => void;
  searchResults: google.maps.places.PlaceResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult[]>>;
  onClick?: () => void;
  onMapLoaded: (map: google.maps.Map, maps: typeof google.maps) => void;
  keyword:string
}

const StyledMap = styled.div`
  height: 100vh;
  width: 100%;

  .gm-style-iw {
    background-color: #fff !important;
    z-index: 9999 !important;

    .info-window {
      padding: 10px;
      font-size: 14px;
      color: #333;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
  }
`;



export const Map: React.FC<Props> = ({ location, isSwitchLocation, onClickResetSwitch, searchResults, setSearchResults, keyword }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [maps, setMaps] = useState<any>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindows, setInfoWindows] = useState<google.maps.InfoWindow[]>([]);

  const getCenterPosition = (location: Coords, isSwitchLocation: string, onClickResetSwitch: () => void) => {
    if (map && isSwitchLocation === 'on') {
      const { lat, lng } = location;
      const centerLocation = new google.maps.LatLng(lat, lng);
      map.setCenter(centerLocation);
      onClickResetSwitch();
    }
  };


  // const searchByPlaceName = (placeName: string) => {
  //   if (map && maps) {
  //     const service = new maps.places.PlacesService(map);
  
  //     const searchKeywords = ['gym', 'ジム', '温泉', '銭湯', 'サウナ'].map(
  //       (keyword) => `${placeName} ${keyword}`
  //     );
  
  //     searchKeywords.forEach((keyword) => {
  //       service.textSearch(
  //         {
  //           location,
  //           radius: 1500,
  //           query: keyword,
  //         },
  
  //         (
  //           results: google.maps.places.PlaceResult[] | null,
  //           status: google.maps.places.PlacesServiceStatus
  //         ) => {
  //           if (status === maps.places.PlacesServiceStatus.OK && results)
  //           {
  //             console.log(results)

  //             const locationItemList = results.map((result) => {
  //               return {
  //                 lat: result.geometry?.location?.lat(),
  //                 lng: result.geometry?.location?.lng(),
  //                 placeId: result.place_id,
  //                 location: result.geometry?.location,
  //               };
  //             });

  //             locationItemList.forEach((place) => {
  //                {
  //                 map.setCenter(place.location);
  //                 map.setZoom(14);
  //                 let markerIcon;
  //                 if (['温泉', '銭湯', 'サウナ'].includes(keyword)) {
  //                   markerIcon = {
  //                     path: google.maps.SymbolPath.CIRCLE,
  //                     fillColor: 'blue',
  //                     fillOpacity: 1,
  //                     strokeWeight: 2,
  //                     scale: 8,
  //                   };
  //                 } else {
  //                   markerIcon = undefined;
  //                 }
  
  //                 const marker = new maps.Marker({
  //                   map,
  //                   position: place.geometry.location,
  //                   icon: markerIcon,
  //                 });


  
  //                 marker.addListener('click', () => {
  //                   const request = {
  //                     placeId: place.placeId || '',
  //                     fields: [
  //                       'name',
  //                       'formatted_address',
  //                       'formatted_phone_number',
  //                       'rating',
  //                       'opening_hours',
  //                       'website',
  //                       'photos',
  //                     ],
  //                   };
    
  //                   service.getDetails(request, (place, status) => {
  //                     if (status !== google.maps.places.PlacesServiceStatus.OK) return;
    
  //                     // 800は写真のサイズ
  //                     const photoUrl = getPhotoUrl(place?.photos, 800);
    
  //                     // 営業時間を改行させる処理をしている
  //                     const openingHours = place?.opening_hours?.weekday_text
  //                       ? place.opening_hours.weekday_text.join('<br>')
  //                       : '';
                      
  //                       const content = `
  //                       <div class="info-window" style={{height: '100%', overflowY: 'auto'}}>
  //                         <h4>${place?.name}</h4>
  //                         <p>${place?.formatted_address}</p>
  //                         <p>電話番号：<a href="tel:${place?.formatted_phone_number}">${place?.formatted_phone_number}</a></p>
  //                         <p>評価：${place?.rating}</p>
  //                         <p>営業時間：<br>${openingHours}</p>
  //                         <p>ウェブサイト：<a href="${place?.website}" target="_blank" rel="noopener noreferrer">${place?.website}</a></p>
  //                         ${photoUrl ? `<img src="${photoUrl}" alt="${place?.name}" style="width: 100%; height: auto; margin-top: 10px;" />` : ''}
  //                         <p><a href="https://www.google.com/maps/search/?api=1&query=${place?.name}" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'blue' }}>Google Map で見る</a></p>
  //                       </div>
  //                     `;
                      
  //                     const StyledMap = styled.div`
  //                       height: 100vh;
  //                       width: 100%;
                      
  //                       .gm-style-iw {
  //                         background-color: #fff !important;
  //                         z-index: 9999 !important;
                        
  //                         .info-window {
  //                           // InfoWindowの内容をスタイリング
  //                           padding: 10px;
  //                           font-size: 14px;
  //                           color: #333;
  //                           background-color: #fff;
  //                           border-radius: 5px;
  //                           box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  //                         }
  //                       }
  //                     `;
    
                   
  
  //                   const infoWindow = new google.maps.InfoWindow({
  //                     content,
  //                   });
  //                   infoWindow.open(map, marker);
  //                 });
  //                 bounds.extend(marker.position);
  
  //                 // marker.addListener("click", () => {
  //                 //   infoWindow.open(map, marker);
  //                 // });
  
  //             //     setMarkers((prevMarkers) => [...prevMarkers, marker]);
  //             //     setInfoWindows((prevInfoWindows) => [
  //             //       ...prevInfoWindows,
  //             //       infoWindow,
  //             //     ]);
  //             //   }
  //             // });
  //           } else {
  //             // エラー時の処理
  //             console.log("検索できませんでした");
  //           }
  //         }
  //       );
  //     });
  //   }
  // };

  const searchByPlaceName = (placeName: string) => {
    if (map && maps) {
      const service = new maps.places.PlacesService(map);
  
      const searchKeywords = ['gym', 'ジム', '温泉', '銭湯', 'サウナ'].map(
        (keyword) => `${placeName} ${keyword}`
      );
  
      searchKeywords.forEach((keyword) => {
        service.textSearch(
          {
            location,
            radius: 1500,
            query: keyword,
          },
  
          (
            results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus
          ) => {
            if (status === maps.places.PlacesServiceStatus.OK && results) {
              results.forEach((place) => {
                if (place.geometry?.location) {
                  map.setCenter(place.geometry.location);
                  map.setZoom(14);
                  let markerIcon;
                  if (['温泉', '銭湯', 'サウナ'].includes(keyword)) {
                    markerIcon = {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: 'blue',
                      fillOpacity: 1,
                      strokeWeight: 2,
                      scale: 8,
                    };
                  } else {
                    markerIcon = undefined;
                  }
  
                  const marker = new maps.Marker({
                    map,
                    position: place.geometry.location,
                    icon: markerIcon,
                  });

                  const openingHours = place?.opening_hours?.weekday_text
                  ? place.opening_hours.weekday_text.join('<br>')
                  : '';
  
                  const infoWindow = new maps.InfoWindow({
                    content: `
                      <div>
                        <h3>${place.name}</h3>
                        <p>${place.formatted_address}</p>
                        <p>評価：${place?.rating}</p>
                        <p><a href="https://www.google.com/maps/search/?api=1&query=${place?.name}" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'blue' }}>Google Map で見る</a></p>
                      </div>
                    `,
                  });

                  const StyledMap = styled.div`
                  height: 100vh;
                  width: 100%;
                
                  .gm-style-iw {
                    background-color: #fff !important;
                    z-index: 9999 !important;
                  
                    .info-window {
                      // InfoWindowの内容をスタイリング
                      padding: 10px;
                      font-size: 14px;
                      color: #333;
                      background-color: #fff;
                      border-radius: 5px;
                      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                    }
                  }
                `;
  
                  marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                  });
  
                  setMarkers((prevMarkers) => [...prevMarkers, marker]);
                  setInfoWindows((prevInfoWindows) => [
                    ...prevInfoWindows,
                    infoWindow,
                  ]);
                }
              });
            } else {
              // エラー時の処理
              console.log("検索できませんでした");
            }
          }
        );
      });
    }
  };
  
  
  useEffect(() => {
    getCenterPosition(location, isSwitchLocation, onClickResetSwitch);
    searchByPlaceName(keyword);
  }, [location, isSwitchLocation, onClickResetSwitch, keyword]);
  

 
  // handleApiLoaded 関数の定義を開始し、その関数が Google Maps API の読み込みが完了したときに呼び出されるようにしている。 setMap と setMaps という 2 つのステート更新関数を呼び出して、map と maps の値をそれぞれのステートに保存しています。これにより、コンポーネントの他の部分で map と maps の値にアクセスできるようになる
  const handleApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
    setMap(map);
    // : Google Maps のインスタンス（オブジェクト）です。これを使用して、マップにマーカーやインフォウィンドウなどのオブジェクトを追加したり、マップのプロパティ（ズームレベルや中心地点など）を操作したりできる。
    setMaps(maps);
    // : Google Maps API が提供するすべてのクラス、メソッド、オブジェクトにアクセスできるようにするオブジェクトです。これを使用して、新しいマーカーやインフォウィンドウのインスタンスを作成したり、特定のサービス（Places API など）を使用したりできる。

    const service = new google.maps.places.PlacesService(map);
    if (maps === null) return;
    const bounds = new maps.LatLngBounds();

    // 現在地から半径1.5km以内の範囲を円形に表示
    const circle = new google.maps.Circle({
      center: location,
      radius: 1500,
    });
    map.fitBounds(circle.getBounds()!);

    const searchKeywords = ['gym', 'ジム', '温泉', '銭湯', 'サウナ'];

    // forEachで定義したSearchKeywordのservice.textSearchの要素に対して処理を実行
    searchKeywords.forEach((keyword) => {
      service.textSearch(
        {
          location, // 現在地
          radius: 1500, // 対象範囲
          query: keyword, // 検索ワード
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (!results) return;

            // mapでlocationItemListの要素から新しい配列を生成
            const locationItemList = results.map((result) => {
              return {
                lat: result.geometry?.location?.lat(),
                lng: result.geometry?.location?.lng(),
                placeId: result.place_id,
              };
            });

            locationItemList.forEach((item) => {
           
              let markerIcon;
              if (['温泉', '銭湯', 'サウナ'].includes(keyword)) {
                markerIcon = {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: 'blue',
                  fillOpacity: 1,
                  strokeWeight: 2,
                  scale: 8,
                };
              } else {
                markerIcon = undefined;
              }

              const marker = new maps.Marker({
                position: {
                  lat: item.lat,
                  lng: item.lng,
                },
                map,
                icon: markerIcon,
              });

              // 写真の大きさを定義している
              const getPhotoUrl = (photos: google.maps.places.PlacePhoto[] | undefined, maxWidth: number) => {
                if (!photos || !photos.length) return null;

                const photo = photos[0]; // You can select other photos in the array if you prefer
                return photo.getUrl({ maxWidth });
              };

              // addListenerでmarkerをクリックすると店舗詳細情報が取得できるようにしている。markerは対象要素
              marker.addListener('click', () => {
                const request = {
                  placeId: item.placeId || '',
                  fields: [
                    'name',
                    'formatted_address',
                    'formatted_phone_number',
                    'rating',
                    'opening_hours',
                    'website',
                    'photos',
                  ],
                };

                service.getDetails(request, (place, status) => {
                  if (status !== google.maps.places.PlacesServiceStatus.OK) return;

                  // 800は写真のサイズ
                  const photoUrl = getPhotoUrl(place?.photos, 800);

                  // 営業時間を改行させる処理をしている
                  const openingHours = place?.opening_hours?.weekday_text
                    ? place.opening_hours.weekday_text.join('<br>')
                    : '';
                  
                    const content = `
                    <div class="info-window" style={{height: '100%', overflowY: 'auto'}}>
                      <h4>${place?.name}</h4>
                      <p>${place?.formatted_address}</p>
                      <p>電話番号：<a href="tel:${place?.formatted_phone_number}">${place?.formatted_phone_number}</a></p>
                      <p>評価：${place?.rating}</p>
                      <p>営業時間：<br>${openingHours}</p>
                      <p>ウェブサイト：<a href="${place?.website}" target="_blank" rel="noopener noreferrer">${place?.website}</a></p>
                      ${photoUrl ? `<img src="${photoUrl}" alt="${place?.name}" style="width: 100%; height: auto; margin-top: 10px;" />` : ''}
                      <p><a href="https://www.google.com/maps/search/?api=1&query=${place?.name}" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'blue' }}>Google Map で見る</a></p>
                    </div>
                  `;
                  
                  const StyledMap = styled.div`
                    height: 100vh;
                    width: 100%;
                  
                    .gm-style-iw {
                      background-color: #fff !important;
                      z-index: 9999 !important;
                    
                      .info-window {
                        // InfoWindowの内容をスタイリング
                        padding: 10px;
                        font-size: 14px;
                        color: #333;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                      }
                    }
                  `;

                  const infoWindow = new google.maps.InfoWindow({
                    content,
                  });
                  infoWindow.open(map, marker);
                });
              });
              bounds.extend(marker.position);
            });
          }
        }
      );
    }
    );
  };

  const handleMapClick = (value: ClickEventValue) => {
    // If you have an onClick prop, add it to the Props interface and uncomment the following lines:
    // if (props.onClick) {
    //   props.onClick();
    // }
  };

  

  return (
    <StyledMap>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
            libraries: ['drawing', 'geometry', 'places', 'visualization'],
          }}
          defaultCenter={location}
          defaultZoom={10}
          onClick={handleMapClick}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleApiLoaded}
        />


      </div>
    </StyledMap>
  );
};




