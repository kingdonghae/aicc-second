import { useState } from 'react';
import { useNavigation } from '@/hook/useNavigation';
import { useShowModal} from "@/utils/showModal.js";
import '@/styles/SignupTerms.css';



const SignupTerms = () => {
    const { goSignupSocialForm, goSignupForm } = useNavigation();
    const showModal = useShowModal();

    const [agreeAll, setAgreeAll] = useState(false);
    const [agreements, setAgreements] = useState({
        age: false,
        service: false,
        privacy: false,
        marketing: false,
    });

    const toggleAll = () => {
        const next = !agreeAll;
        setAgreeAll(next);
        setAgreements({
            age: next,
            service: next,
            privacy: next,
            marketing: next,
        });
    };

    const toggleItem = (key) => {
        const next = !agreements[key];
        const updated = { ...agreements, [key]: next };
        setAgreements(updated);
        setAgreeAll(Object.values(updated).every(Boolean));
    };

    const handleNext = () => {
        const { age, service, privacy } = agreements;
        if (age && service && privacy) {
            const tempToken = sessionStorage.getItem('tempToken');
            if (tempToken) {
                sessionStorage.setItem('confirmedToken', tempToken);
                sessionStorage.removeItem('tempToken');
                goSignupSocialForm();
            } else {
                goSignupForm();
            }
        } else {
            showModal({
                title: '',
                message: '필수 약관에 모두 동의해주세요.',
                showCancelButton: false,
            });
        }
    };


    return (
        <div className="terms-wrapper">
            <h2>회원가입 약관 동의</h2>
            <div className="checkbox-group">
                <label><input type="checkbox" checked={agreeAll} onChange={toggleAll} /> 모두 동의합니다</label>
                <label><input type="checkbox" checked={agreements.age} onChange={() => toggleItem('age')} /> [필수] 만 14세 이상입니다.</label>
                <label><input type="checkbox" checked={agreements.service} onChange={() => toggleItem('service')} /> [필수] 서비스 이용약관 동의</label>
                <label><input type="checkbox" checked={agreements.privacy} onChange={() => toggleItem('privacy')} /> [필수] 개인정보 수집 및 이용 동의</label>
                <label><input type="checkbox" checked={agreements.marketing} onChange={() => toggleItem('marketing')} /> [선택] 마케팅 정보 수신 동의</label>
            </div>
            <button className="terms-submit-button" onClick={handleNext}>동의하고 가입하기</button>
        </div>
    );
};

export default SignupTerms;
