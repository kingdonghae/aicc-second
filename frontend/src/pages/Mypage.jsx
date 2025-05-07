import '@/styles/Mypage.css';

const Mypage = () => {

    return (
        <div className="background">
            <form className="mypage-form">

                <input type="text" placeholder="아이디 데이터" readOnly className='hold-data' />

                <input type="password" placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" required />
                <input type="password" placeholder="비밀번호 재입력" required />
                <input type="text" placeholder="이름 데이터" readOnly className='hold-data' />

                <div className="birth-group">
                    <input type="date" readOnly />
                    {/* <input type="text" placeholder="생년" required /> */}
                    {/* <input type="text" placeholder="월" required />
          <input type="text" placeholder="일" required /> */}
                </div>
                {/* placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력) placeholder="email@example.com"" */}
                <input type="text" placeholder="휴대폰 번호도 수정할 수 있게 해야겠죠?" className='hold-data' readOnly />
                <input type="email" placeholder='이메일도 수정할 수 있어야겠죠?' className='hold-data' readOnly />

                <div className="input-group">
                    <input type="text" id='address' placeholder="주소를 검색해주세요" required readOnly />
                    <button type="button" className="check-button">주소 검색</button>
                </div>
                <input type="text" placeholder='상세 주소를 입력해주세요' id='detail-address' />


                <div id='modify-box'>
                    <button type="submit" className="mypage-button">수정하기</button>
                    <button type='button' className='mypage-button'>취소</button>
                </div>
            </form>
        </div>
    );
};

export default Mypage;