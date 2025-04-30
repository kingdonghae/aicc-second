import {useKakaoAddress} from "@/features/home/hook/UseKakaoAddress.jsx";
import {useState} from "react";

export default function MainInputBox() {
    const [inputValue, setInputValue] = useState("");
    const { result: recommendations, loading } = useKakaoAddress(inputValue);

    return (
        <div>
            <form id='main-input-box' onSubmit={(e) => {e.preventDefault();}}>
                <input type="text"
                       placeholder='주소를 입력해주세요.'
                       value={inputValue}
                       onChange={(e)=>{setInputValue(e.target.value)}}/>
                <button id='input-button' type='button'></button>
            </form>

            {loading && <p>검색 중...</p>}

            {recommendations.length > 0 && (
            <ul className="recommendation-list">
              {recommendations.map((addr) => (
                <li key={addr.address_name}>{addr.address_name}</li>
              ))}
            </ul>
          )}
    </div>
    )
}