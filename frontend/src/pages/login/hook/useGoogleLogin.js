export const useGoogleLogin = () => {
    const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;

    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };

    return { handleGoogleLogin };
};
