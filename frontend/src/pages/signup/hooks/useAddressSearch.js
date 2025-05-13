// hooks/useAddressSearch.js
export const useAddressSearch = (setAddress) => {
    return () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setAddress(data.address);
            },
        }).open();
    };
};
