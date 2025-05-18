import CommentList from "@/pages/textdetail/components/CommentList.jsx";

const NavButton = ({direction, condition, onClick}) => {
    return (
        <div
            onClick={condition ? onClick : undefined}
            style={{
                opacity: condition ? 1 : 0.4,
                cursor: condition ? 'pointer' : 'default',
            }}
        >
            {direction === 'prev' ? '◀ 이전글' : '다음글 ▶'}
        </div>
    )
}

export default NavButton;
