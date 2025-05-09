import { CATEGORY_MAP } from "../../../constants/mapDefaults";

const CategoryButton = ({ id, label, color, isActive, onToggle }) => {
    return (
        <div
            className="custom-button-frame"
            onClick={() => onToggle(id)}
            style={{
                color: isActive ? color : 'gray',
            }}
        >
            <button
                style={{
                    backgroundImage: `url(${CATEGORY_MAP[id].image})`,
                    backgroundColor:"white",
                    filter: isActive ? 'none' : 'grayscale(100%)',
                    // backgroundColor: isActive ? color : 'gray',
                }}
            />
            {label}
        </div>
    );
};

export default CategoryButton;
