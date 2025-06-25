import { useLocation } from 'react-router-dom';


export const useCustomSelection = () => {

  const location = useLocation();
  return location.state?.selectedItem || [];
};