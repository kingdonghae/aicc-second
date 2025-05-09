import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SearchBox from '../components/SearchBox';
import DetailList from '../components/DetailList';
import DetailPreview from '../components/DetailPreview';
import APIMap from "@/components/APIMap.jsx";
import '../styles/Map.css';

const Map = () => {
    const navigate = useNavigate();
    const menuRef = useRef();
    
    const [menu, setMenu] = useState(false);
    const [showList, setShowList] = useState(true);
    const [address, setAddress] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [rerenderKey, setRerenderKey] = useState(Date.now());
    const [isDrag, setIsDrag] = useState(false);
    const [category, setCategory] = useState({
        subway: true,
        school: true,
        mart: true,
        hospital: true
    })

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = Number(searchParams.get('key')) || Date.now();

    const toggleMenu = () => {
        setMenu(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target)) {
                setMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menu]);
