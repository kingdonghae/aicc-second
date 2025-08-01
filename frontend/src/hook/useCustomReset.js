// src/hook/useCustomSessionReset.js

export const useCustomSessionReset = () => {
  const clearSelected = () => {
    sessionStorage.removeItem('selected');
  };

  return { clearSelected };
};