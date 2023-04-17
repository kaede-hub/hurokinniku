import React, { useState } from 'react';
import GoogleMapReact, { ClickEventValue, Coords } from 'google-map-react';

type Props = {
  location: Coords;
  onClick?: () => void;
};

const Map = (props: Props) => {
  const { location } = props;

  // TODO: どこにもどこにも使用していないため不要なら削除してください
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [maps, setMaps] = useState<any>(null);

  // 「サウナ ジム」で検索して結果に基づいてマーカーを立てる処理
  const handleApiLoaded = ({ map, maps }: { map: google.maps.Map; maps: any }) => {
    setMap(map);
    setMaps(maps);

    const service = new google.maps.places.PlacesService(map);
    if (maps === null) return;
    const bounds = new maps.LatLngBounds();

    service.textSearch(
      {
        location, // 現在地
        radius: 1500, // 対象範囲
        query: 'gym  ジム 温泉 銭湯 サウナ spa',  // 検索ワード
      },

      (results, status) => {
        // 検索に成功したらマーカーを立てる
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // 検索結果がないなら処理を終了
          if (!results) return;

          // 検索結果から緯度経度を取得
          const locationItemList = results.map((result) => {
            return {
              lat: result.geometry?.location?.lat(),
              lng: result.geometry?.location?.lng(),
              placeId: result.place_id, // Place ID を格納
            };
          });

          locationItemList.forEach((item) => {
            // Place Details API で店舗の詳細情報を取得
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

            // マーカーを作成し、マップ上に表示
            const marker = new maps.Marker({
              position: {
                lat: item.lat,
                lng: item.lng,
              },
              map,
            });
            // マーカーにクリックイベントを追加
            marker.addListener('click', () => {
              // Place Details API で店舗の詳細情報を取得
              const request = {
                placeId: item.placeId || '',
                fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating', 'opening_hours', 'website'],
              };
              service.getDetails(request, (place, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) return;

                // 店舗の詳細情報をポップアップ表示
                const content = `
                <div>
                  <h4>${place?.name}</h4>
                  <p>${place?.formatted_address}</p>
                  <p>電話番号${place?.formatted_phone_number}</p>
                  <p>評価${place?.rating}</p>
                  <p>営業時間${place?.opening_hours?.weekday_text}</p>
                  <p>ウェブサイト${place?.website}</p>
                  <a href="https://www.google.com/maps/search/?api=1&query=${place?.name}" target="_blank" rel="noopener noreferrer"  style={{ fontWeight: 'bold', color: 'blue' }}>Google Map で見る</a>
                </div>
              `;

                const infoWindow = new google.maps.InfoWindow({
                  content,
                });
                infoWindow.open(map, marker);
              });
            });

            bounds.extend(marker.position);
            // marker.addListener('click', () => {
            //   alert('マーカーがクリックされました');
            // });
            bounds.extend(marker.position);
          });
          map.fitBounds(bounds);
        }
      }
    );
  };


  function handleMapClick(value: ClickEventValue) {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          // 自分のAPIキーを環境変数に設定して使用してください
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
          libraries: ['drawing', 'geometry', 'places', 'visualization'],
        }}
        defaultCenter={location}
        defaultZoom={5.09} onClick={handleMapClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      />
    </div>
  );
};

export default Map;