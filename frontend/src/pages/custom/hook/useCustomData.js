import { useState } from 'react';
import { useLocation } from 'react-router-dom';


export const useCustomData = () => {
    
  const location = useLocation();

  const selected = location.state?.selectedItem || [];
  const initInput = location.state?.inputValues || {};

  const [inputs, setInputs] = useState(initInput);

  const handleChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  return {
    selected,
    inputs,
    handleChange,
  };
};