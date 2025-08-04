import { useState } from 'react';
import { useNavigation } from '@/hook/useNavigation';

export const useCustom = () => {
    const [customMenu, setCustomMenu] = useState(false);
    const { goCustom } = useNavigation();

    return { customMenu, setCustomMenu, goCustom };
};