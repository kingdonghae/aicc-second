import { useNavigation } from "@/hook/useNavigation.js";

const DetailPreview = ({ isDrag, address, coords }) => {
    const { goInfoDetail } = useNavigation();

    return (
        <div className={`preview-popup ${isDrag ? 'drag' : ''}`}>
            <div className='preview-text-frame'>
            <h3>입력한 주소</h3>
                <p>{address}</p>
                <div id='preview-text'>시끄럽군요.<br /> 이사는 어때요?</div>
                <button id='detail-move'  onClick={() => goInfoDetail(coords) }>상세 보기</button>
            </div>
        </div>
    )
}

export default DetailPreview