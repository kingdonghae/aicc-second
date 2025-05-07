import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const useMapController = () => {
    const location = useLocation();
    const initialAddress = location.state?.address || '';
    const initialCoords = location.state?.coords || null;

    const [address, setAddress] = useState(initialAddress);
    const [coords, setCoords] = useState(initialCoords);
    const [showList, setShowList] = useState(true);
    const [isDrag, setIsDrag] = useState(false);
    const [category, setCategory] = useState({
        subway: true,
        school: true,
        mart: true,
        hospital: true,
    });

    return {
        address, setAddress,
        coords, setCoords,
        showList, setShowList,
        isDrag, setIsDrag,
        category, setCategory,
    };
};
