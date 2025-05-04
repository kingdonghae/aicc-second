import { useEffect, useRef, useState } from "react";
import {useKakaoAddress} from "@/features/home/hook/UseKakaoAddress.jsx";
import {logSearchKeyword} from "@/features/home/services/HomeService.jsx";

export const useAddressInput = () => {

    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);

    const inputRef = useRef(null);
    const itemRefs = useRef([]);

    const { result: recommendations } = useKakaoAddress(inputValue);

    useEffect(() => {
        itemRefs.current = recommendations.map((_, i) => itemRefs.current[i] || { current: null });
    }, [recommendations]);

    const handleSelectAddress = (address) => {
        setInputValue(address);
        setIsFocused(false);
        setHighlightIndex(-1);
        // onSelect?.(address);
        logSearchKeyword(address)
    };

    const handleInputKeyDown = (e) => {
        if (recommendations.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = highlightIndex + 1 >= recommendations.length ? 0 : highlightIndex + 1;
            itemRefs.current[next]?.current?.focus();
            setHighlightIndex(next);
        }
    };

    const handleItemKeyDown = (e, index) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const delta = e.key === "ArrowDown" ? 1 : -1;
            const next = (index + delta + recommendations.length) % recommendations.length;
            itemRefs.current[next]?.current?.focus();
            setHighlightIndex(next);
        } else if (e.key === "Enter") {
            e.preventDefault();
            handleSelectAddress(recommendations[index].address_name);
        } else if (/^[a-zA-Z0-9ㄱ-ㅎ가-힣]$/.test(e.key) || e.key === "Backspace") {
            e.preventDefault();
            const newValue = e.key === "Backspace"
                ? inputValue.slice(0, -1)
                : inputValue + e.key;
            setInputValue(newValue);
            setIsFocused(true);
            setTimeout(() => inputRef.current?.focus(), 0);
        } else if (e.key === "Escape") {
            setIsFocused(false);
            setHighlightIndex(-1);
        }
    };

    return {
        inputValue,
        setInputValue,
        inputRef,
        isFocused,
        setIsFocused,
        highlightIndex,
        setHighlightIndex,
        itemRefs,
        handleInputKeyDown,
        handleItemKeyDown,
        handleSelectAddress,
        recommendations
    };
};
