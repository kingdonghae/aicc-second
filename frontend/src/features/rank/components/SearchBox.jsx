import React from 'react'

const Searchbox = () => {
  return (
    <div className='search-page'>
        <form id='search-input-box'>
          <input type="text" placeholder='주소를 입력해주세요.' />
          <button id='input-button'></button>
        </form>
      
    </div>
  )
}

export default Searchbox
