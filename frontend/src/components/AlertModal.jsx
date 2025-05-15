import { useRecoilState } from 'recoil';
import { modalState } from '@/atoms/modalState';

export default function AlertModal() {
    const [modal, setModal] = useRecoilState(modalState);

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    closeModal();
    modal.onConfirm?.();
  };

  const handleCancel = () => {
    closeModal();
    modal.onCancel?.();
  };

  if (!modal.isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center bg-[rgba(0,0,0,0.17)]  items-center z-50 pointer-events-none">
            <div className="bg-white backdrop-brightness rounded-2xl p-9 w-1/4 max-w-sm text-center shadow-1xl pointer-events-auto animate-fade-in">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{modal.title}</h2>
                <p className="text-gray-600 text-[25px] mb-6">{modal.message}</p>
                <div className="flex justify-center gap-7">
                    {modal.showCancelButton && (
                        <button
                            className="px-3 py-1.5 bg-gray-200 text-gray-800 text-[20px] rounded-full hover:bg-gray-300 transition"
                            onClick={handleCancel}
                        >
                            취  소
                        </button>
                    )}
                    <button
                        className="px-3 py-1.5 bg-blue-500 text-white text-[20px] p-2  rounded-full hover:bg-blue-600 transition"
                        onClick={handleConfirm}
                    >
                        확  인
                    </button>
                </div>
            </div>
        </div>
    );

}
