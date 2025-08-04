import { useState, useEffect } from 'react';


export const useCustomToggle = (max = 3) => {

    const [selected, setSelected] = useState(() => {
        const saveSelected = sessionStorage.getItem('selected');
        return saveSelected ? JSON.parse(saveSelected) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('selected', JSON.stringify(selected));
    }, [selected]);

    const toggleSelect = (id) => {
        if (selected.includes(id)) { // 배열 안에 특정 값이 있냐??
            setSelected(selected.filter(item => item !== id));
        } else if (selected.length >= max) {
            return;
        } else {
            setSelected([...selected, id]);
        }
    };

    const resetSelect = () => {
        setSelected([]);
        sessionStorage.removeItem('selected');
    };

    return { selected, toggleSelect, resetSelect };
};
