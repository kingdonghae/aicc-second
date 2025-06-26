import { useNavigation } from "@/hook/useNavigation.js";
import { itemData } from '@/constants/itemData';
import { useCustomToggle } from './hook/useCustomToggle';
import '@/styles/Custom.css';


const Custom = () => {

    const { goCustomInput } = useNavigation();

    const { selected, toggleSelect } = useCustomToggle(3);

    return (
        <div className='custom-background'>
            <div className='custom-area'>
                <h2>집을 구할 때 가장 중요한 세 가지를 골라주세요</h2>
                <ul className='custom-container'>
                    {Object.entries(itemData).map(([id, { icon: Icon, label }]) => (
                        <li
                            key={id}
                            className={`item ${selected.includes(id) ? 'selected' : ''}`}
                            onClick={() => toggleSelect(id)}
                        >
                            <Icon />
                            <span>{label}</span>
                            {selected.indexOf(id) === 0 && <span>1순위</span>}
                            {selected.indexOf(id) === 1 && <span>2순위</span>}
                            {selected.indexOf(id) === 2 && <span>3순위</span>}
                        </li>
                    ))}
                </ul>
                <button
                    className={selected.length > 0 ? 'active' : 'disabled'}
                    onClick={() => {
                        if (selected.length > 0) goCustomInput(selected);
                    }}
                >
                    다음으로
                </button>
            </div>
        </div>
    );
};

export default Custom;
