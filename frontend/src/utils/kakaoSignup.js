export const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAOMAP_KEY);
      console.log('✅ Kakao SDK 초기화 완료');
    }
  };