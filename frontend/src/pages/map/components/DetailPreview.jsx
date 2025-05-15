import { useNavigation } from "@/hook/useNavigation.js";


const DetailPreview = ({ isDrag, address, coords }) => {
    const { goInfoDetail } = useNavigation();

    return (
        <div className={`preview-popup ${isDrag ? 'drag' : ''}`}>
            <div className='preview-text-frame'>
                {address ? (
                    <>
                    <h3>{address}</h3>
                    <p>정보 알아보기</p>
                    {/* <div id='preview-text'>시끄럽군요.<br /> 이사는 어때요?</div> */}
                <button id='detail-move'  onClick={() => goInfoDetail(coords,address) }>상세 보기</button>
                    </>
                ) : (
                    <>
                    <div>
                        <p>주소를 검색하셔서 상세정보를 확인해보세요!</p>
                    </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default DetailPreview
