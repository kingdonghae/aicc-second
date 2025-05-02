import React from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbox = ({ inputValue, setInputValue, onSearch }) => {
  const navigate = useNavigate();

  const submitSearch = () => {
    if (inputValue.trim()) {
      // ✅ alertShown 초기화
      window.alertShown = false;

      setInputValue(inputValue.trim());
      onSearch(inputValue.trim());
      navigate(`/map?address=${encodeURIComponent(inputValue.trim())}&key=${Date.now()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitSearch();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    submitSearch();
  };

  return (
    <div className='search-page'>
      <form id='search-input-box' onSubmit={handleClick}>
        <input
          type="text"
          placeholder='주소를 입력해주세요.'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button id='input-button'></button>
      </form>
    </div>
  );
};

export default Searchbox;
