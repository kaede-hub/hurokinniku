// import React, { useImperativeHandle, useState } from 'react';
import GoogleMapReact, { ClickEventValue, Coords } from 'google-map-react';
import Image from 'next/image';
import { Box, Text, Flex } from '@chakra-ui/react';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import SearchForm from './SearchForm';

type Props = {
  location: Coords;
  isSwitchLocation: string;
  onClickResetSwitch: () => void;
  onClick?: () => void;
};

export type MapRef = {
  centerMap: (location: Coords) => void;
};

export const Map = (props: Props) => {
  const { location, isSwitchLocation, onClickResetSwitch } = props;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [maps, setMaps] = useState<any>(null);

  // 現在地に戻す処理
  const getCenterPosition = (location: Coords, isSwitchLocation: string, onClickResetSwitch: () => void) => {
    if (map && isSwitchLocation === 'on') {
      const { lat, lng } = location;
      const centerLocation = new google.maps.LatLng(lat, lng);
      map.setCenter(centerLocation);
      onClickResetSwitch();
    }
  };

  useEffect(() => {
    getCenterPosition(location, isSwitchLocation, onClickResetSwitch);
  }, [location, isSwitchLocation, onClickResetSwitch]);

  const handleApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
    setMap(map);
    setMaps(maps);

    const service = new google.maps.places.PlacesService(map);
    if (maps === null) return;
    const bounds = new maps.LatLngBounds();

    // 現在地から半径1.5km以内の範囲を円形に表示
    const circle = new google.maps.Circle({
      center: location,
      radius: 1500,
    });
    map.fitBounds(circle.getBounds()!);

    const searchKeywords = ['gym', 'spa', 'ジム', '温泉', '銭湯', 'サウナ'];

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

            const locationItemList = results.map((result) => {
              return {
                lat: result.geometry?.location?.lat(),
                lng: result.geometry?.location?.lng(),
                placeId: result.place_id,
              };
            });

        locationItemList.forEach((item) => {
          const request = {
            placeId: item.placeId || '',
            fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'opening_hours', 'website'],
          };
          service.getDetails(request, (place, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK) return;

            console.log('店舗名：', place?.name);
            console.log('詳細：', place?.formatted_address);
            console.log('電話番号：', place?.formatted_phone_number);
            console.log('評価：', place?.rating);
            console.log('営業時間：', place?.opening_hours?.weekday_text);
            console.log('Web サイト：', place?.website);
          });

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

          marker.addListener('click', () => {
            const request = {
              placeId: item.placeId || '',
              fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'opening_hours', 'website'],
            };
            service.getDetails(request, (place, status) => {
              if (status !== google.maps.places.PlacesServiceStatus.OK) return;

              const content = `
              <div>
                <h4>${place?.name}</h4>
                <p>${place?.formatted_address}</p>
                <p>電話番号：${place?.formatted_phone_number}</p>
                <p>評価：${place?.rating}</p>
                <p>営業時間：${place?.opening_hours?.weekday_text}</p>
                <p>ウェブサイト：${place?.website}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=${place?.name}" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'blue' }}>Google Map で見る</a>
              </div>
            `;

              const infoWindow = new google.maps.InfoWindow({
                content,
              });
              infoWindow.open(map, marker);
            });
          });

          bounds.extend(marker.position);

          // TODO: 不要なら削除すること
          // NOTE: この処理により表示位置がずれるためコメントアウトした
          // map.fitBounds(bounds);
        });
            }
          }
        );
      }
    );
  };

  const handleMapClick = (value: ClickEventValue) => {
    if (props.onClick) {
      props.onClick();
    }
  };

  function setAddress(value: any) {
    throw new Error('Function not implemented.');
  }

    return (
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
    );
};