// pages/MapPage.jsx
import React from 'react';
import '@/styles/Map.css';
import KakaoMap from "@/pages/map/components/KakaoMap.jsx";
import SearchBox from "@/components/SearchBox.jsx";
import DetailList from "@/pages/map/components/DetailList.jsx";
import DetailPreview from "@/pages/map/components/DetailPreview.jsx";
import { useMapController } from "@/pages/map/hook/useMapController.js";

const MapPage = () => {
    const {
        address, setAddress,
        coords, setCoords,
        showList, setShowList,
        isDrag, setIsDrag,
        category, setCategory
    } = useMapController();

    return (
        <div className="mapbackground">
            <KakaoMap
                address={address}
                coords={coords}
                category={category}
                onDragStart={() => setIsDrag(true)}
                onDragEnd={() => setIsDrag(false)}
            />
            <div className="search-box">
                <div className="search-page">
                    <SearchBox
                        defaultValue={address}
                        onSearch={(newAddress, newCoords) => {
                            setAddress(newAddress);
                            setCoords(newCoords);
                        }}
                    />
                </div>
            </div>

            {!showList && (
                <button
                    className="toggle-list-button"
                    onClick={() => setShowList((prev) => !prev)}
                >
                    항목<br />보기
                </button>
            )}
            {showList && (
                <div className="list-box">
                    <DetailList
                        isDrag={isDrag}
                        onClose={() => setShowList(false)}
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
            )}

            <div className="preview-box">
                <DetailPreview
                    isDrag={isDrag} />
            </div>
        </div>
    );
};

export default MapPage;
