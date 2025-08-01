import Marker from './Marker';
import { useRef } from 'react';
import { useKakaoMap } from "@/pages/map/hook/useKakaoMap.js";

function KakaoMap({ address, coords, onDragStart, onDragEnd, category, zoomLevel, onMapLoad }) {
    const mapContainerRef = useRef(null);
    const { mapInstance, center } = useKakaoMap({ coords, address, onDragStart, onDragEnd, mapRef: mapContainerRef, zoomLevel });

    if (mapInstance && onMapLoad) {
        onMapLoad(mapInstance);
    }

    return (
        <>
            <div
                ref={mapContainerRef}
                style={{ width: '100%', height: '100%' }}
            />
            <Marker map={mapInstance} category={category} center={center} />
        </>
    );
}

export default KakaoMap;
