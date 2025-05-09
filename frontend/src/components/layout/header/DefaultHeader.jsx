import HeaderBase from './HeaderBase';
import HeaderMenuBtn from './HeaderMenuBtn';

const DefaultHeader = () => {
    return (
        <HeaderBase showMenuButton={true}>
            {(menuRef) => (
                <HeaderMenuBtn menuRef={menuRef} />
            )}
        </HeaderBase>
    );
};

export default DefaultHeader;
