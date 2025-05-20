import CategoryButton from './CategoryButton';
import { CATEGORY_MAP } from "@/constants/mapDefaults.js";

const DetailList = ({ onClose, isDrag, category, setCategory }) => {
    const toggleCategory = (id) => {
        setCategory((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={`list-popup ${isDrag ? 'drag' : ''}`}>
            <div className='list-top'>
                <button id='list-close' onClick={onClose}>닫기</button>
                <p>필요한 생활 정보 마커를 눌러보세요!</p>

            </div>
            <div className="custom-button-group">
                {Object.entries(CATEGORY_MAP).map(([id, { label, color }]) => (
                    <CategoryButton
                        key={id}
                        id={id}
                        label={label}
                        color={color}
                        isActive={category[id]}
                        onToggle={toggleCategory}
                    />
                ))}
            </div>
        </div>
    );
};

export default DetailList;
