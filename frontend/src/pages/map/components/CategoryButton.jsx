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
                className="custom-button"
                style={{
                    backgroundColor: isActive ? color : 'gray',
                    border: 'none',
                }}
            />
            {label}
        </div>
    );
};

export default CategoryButton;
