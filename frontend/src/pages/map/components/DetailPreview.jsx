import { useNavigation } from "@/hook/useNavigation.js";

const DetailPreview = ({ isDrag, address, coords, score, gpt }) => {
    const { goInfoDetail } = useNavigation();

    const handleClick = () => {
        goInfoDetail(coords, address, score, gpt);
    };

    return (
        <div className={`preview-popup ${isDrag ? 'drag' : ''}`}>
            <div className="preview-text-frame">
                {address ? (
                    <>
                        <h3>집PT 분석 리포트</h3>
                        <button
                            id='detail-move'
                            onClick={handleClick}
                            disabled={!score || !gpt}
                            className={!score || !gpt ? 'disabled-button' : 'active-button'}>
                            확인해보기
                        </button>
                        <p>{score && gpt ? '분석이 완료되었습니다!' : '분석 중입니다...'}</p>
                        
                    </>
                ) : (
                    <>
                        <h3>이 동네, 어떤가요?</h3>
                        <p>주소를 입력하면</p><p>분석 리포트를 보여드려요!</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailPreview;
