import '../styles/Signup.css';

const Signup = () => {
  return (
    <div className="background">
      <form className="signup-form">

        <div className="input-group">
          <input type="text" placeholder="아이디 입력 (6~20자)" required />
          <button type="button" className="check-button">중복 확인</button>
        </div>

        <input type="password" placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" required />
        <input type="password" placeholder="비밀번호 재입력" required />
        <input type="text" placeholder="이름을 입력해주세요." required />

        <div className="birth-group">
          <input type="date" required />
          {/* <input type="text" placeholder="생년" required /> */}
          {/* <input type="text" placeholder="월" required />
          <input type="text" placeholder="일" required /> */}
        </div>
        
        <input type="text" placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)" required />
        <input type="email" placeholder="email@example.com" required />

        <div className="input-group">
          <input type="text" id='address' placeholder="주소를 검색해주세요" required readOnly/>
          <button type="button" className="check-button">주소 검색</button>
        </div>
        <input type="text" placeholder='상세 주소를 입력해주세요' id='detail-address'/>



        <div className="check-box">
        <p>개인정보 활용에 동의하십니까?</p>
        <input type="checkbox" required />
        </div>

        <button type="submit" className="submit-button">가입하기</button>
      </form>
    </div>
  );
};

export default Signup;
