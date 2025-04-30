import { useKakaoAddress } from "@/features/home/hook/UseKakaoAddress.jsx";
import { useState } from "react";

export default function MainInputBox() {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const { result: recommendations } = useKakaoAddress(inputValue);

    const handleSelectAddress = (address) => {
        console.log(address)
        setInputValue(address);
        setIsFocused(false);
    };
    return (
            <form className={isFocused && recommendations.length > 0 ? 'input-focused' : 'input-blured'} id='main-input-box' onSubmit={(e) => {e.preventDefault();}}>
                <input type="text"
                       placeholder='주소를 입력해주세요.'
                       value={inputValue}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                       onChange={(e)=>{setInputValue(e.target.value)}}/>
                <button id='input-button' type='button'></button>

                 {isFocused &&recommendations.length > 0 && (
                    <ul className="recommendation-list">
                        {recommendations.map((addr) => (
                            <li key={addr.address_name} onClick={() => handleSelectAddress(addr.address_name)}>{addr.address_name}</li>
                        ))}
                    </ul>
                )}
            </form>
    )
}