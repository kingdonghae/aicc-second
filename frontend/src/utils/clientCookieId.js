export function ensureClientCookieId() {
    const cookieMatch = document.cookie.match(/(^|;) ?client_id=([^;]*)(;|$)/);
    if (!cookieMatch) {
        const newId = typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : generateFallbackUUID(); // fallback 함수 사용

        document.cookie = `client_id=${newId}; path=/; max-age=31536000`;
        return newId;
    }
    return cookieMatch[2];
}

// Fallback: 간단한 UUID v4 생성기
function generateFallbackUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
