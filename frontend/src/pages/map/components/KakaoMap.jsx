import React, { useRef } from 'react';
import { useKakaoMap } from "@/pages/map/hook/useKakaoMap.js";
import Marker from './Marker';

function KakaoMap({ address, coords, onDragStart, onDragEnd, category }) {
    const mapContainerRef = useRef(null);
    const { mapInstance, center } = useKakaoMap({ coords, address, onDragStart, onDragEnd, mapRef: mapContainerRef });

    return (
        <>
            <div
                ref={mapContainerRef}
                style={{ width: '100vw', height: '100vh' }}
            />
            <Marker map={mapInstance} category={category} center={center} />
        </>
    );
}

export default KakaoMap;
