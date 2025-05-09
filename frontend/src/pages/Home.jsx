
    return (
        <div>
            <section id='top'>
                <header id='main-header'>
                    <div className='menu-box'>
                        <button className='menu-button' onClick={() => navigate('/mypage')}><PersonIcon /></button>
                        <button className='menu-button' onClick={() => navigate('/')}><LogoutIcon /></button>
                        {/* <button className='menu-button' onClick={()=>navigate('/')}>Login</button> */}
                    </div>
                    <h1 id='main-title'>집PT</h1>
                    <p>Zip Place Tool</p>

                </header>

                <form id='main-input-box' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='주소를 입력해주세요.'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    />
                    <button id='input-button' type='submit'><SearchIcon /></button>
                </form>
                <p>e.g. 서울시 영등포구 선유서로 │ 검색 불가 : 코드랩 아카데미, 서울시청</p>
            </section>

            <section id='bottom'>
                <div id='button-box'>
                    <div>
                        <button onClick={goMap} ><MapIcon style={{ fontSize: '3rem' }} /></button>
                        <p>지도 보기</p>
                    </div>
                    <div>
                        <button onClick={() => navigate('/rank')}><TrendingUpIcon style={{ fontSize: '3rem' }} /></button>
                        <p>검색 순위 보기</p>
                    </div>
                    <div>
                        <button><Diversity3Icon style={{ fontSize: '3rem' }} /></button>
                        <p>정보마당</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;