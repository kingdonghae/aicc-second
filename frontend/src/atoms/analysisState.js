import { atom } from 'recoil';

export const analysisState = atom({
    key: 'analysisState',
    default: {
        score: null,
        gpt: '',
        address: '', // 어떤 주소에 대한 분석 결과인지도 저장
        coords: null, // 어떤 좌표에 대한 분석 결과인지도 저장
    },
});