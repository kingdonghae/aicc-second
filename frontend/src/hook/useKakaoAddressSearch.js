import { loadKakaoMapScript } from "@/pages/home/utils/loadKakaoMapScript.js";

export const useKakaoAddressSearch = () => {
    const searchAddress = async (address, onSuccess, onFail) => {
        await loadKakaoMapScript();

        window.kakao.maps.load(() => {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    const { x, y } = result[0];
                    onSuccess({ lat: y, lng: x });
                } else {
                    onFail?.();
                }
            });
        });
    };

    return { searchAddress };
};
