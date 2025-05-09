// import {useAddressInput} from "@/pages/home/hook/useAddressInput.js";
//
// export default function MainInputBox() {
//     const {
//         inputValue,
//         setInputValue,
//         inputRef,
//         isFocused,
//         setIsFocused,
//         highlightIndex,
//         setHighlightIndex,
//         itemRefs,
//         handleInputKeyDown,
//         handleItemKeyDown,
//         handleSelectAddress,
//         recommendations
//     } = useAddressInput();
//
//     return (
//             <form
//                 className={isFocused && recommendations.length > 0 ? 'input-focused' : 'input-blured'}
//                 id='main-input-box'
//                 onSubmit={(e) => {e.preventDefault();}}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={(e) => {
//                     if (!e.currentTarget.contains(e.relatedTarget)) {
//                         setIsFocused(false);
//                     }
//                 }}
//             >
//                 <input
//                     type="text"
//                     placeholder='주소를 입력해주세요.'
//                     ref={inputRef}
//                     value={inputValue}
//                     onChange={(e)=>{
//                         setInputValue(e.target.value);
//                         setHighlightIndex(-1);
//                     }}
//                     onKeyDown={handleInputKeyDown}
//                 />
//                 <button id='input-button' type='button'></button>
//
//                  {isFocused && recommendations.length > 0 && (
//                     <ul className="recommendation-list">
//                         {recommendations.map((addr, index) => (
//                             <li
//                                 key={addr.address_name}
//                                 ref={(el) => itemRefs.current[index] = { current: el }}
//                                 tabIndex="0"
//                                 onClick={() => {handleSelectAddress(addr.address_name)}}
//                                 onKeyDown={(e) => handleItemKeyDown(e, index)}
//                                 style={{
//                                     backgroundColor: highlightIndex === index ? "#f0f0f0" : "white"
//                                 }}
//                             >
//                                 {addr.address_name}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </form>
//     )
// }