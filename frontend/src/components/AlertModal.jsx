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
        <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.17)] z-50 pointer-events-none">
            <div
                className="bg-white backdrop-brightness rounded-2xl px-5 py-6 w-[90%] md:w-1/2 lg:w-1/4 max-w-sm text-center shadow-xl pointer-events-auto animate-fade-in"
            >
                {modal.title && (
                    <h2 className="text-[30px] font-bold mb-3 text-gray-800">{modal.title}</h2>
                )}

                {modal.message && (
                    <div
                        className="text-gray-700 text-[18px] md:text-[20px] max-h-[40vh] overflow-y-auto whitespace-pre-line mb-6"
                        dangerouslySetInnerHTML={{ __html: modal.message }}
                    />
                )}

                <div className="flex justify-center gap-6">
                    {modal.showCancelButton && (
                        <button
                            className="px-3 py-1.5 bg-gray-200 text-gray-800 text-[20px] rounded-full hover:bg-gray-300 transition"
                            onClick={handleCancel}
                        >
                            취  소
                        </button>
                    )}
                    <button
                        className="px-3 py-1.5 bg-[rgb(151,196,169)] text-white text-[20px] rounded-full hover:bg-[rgb(123,174,146)] transition"
                        onClick={handleConfirm}
                    >
                        확  인
                    </button>
                </div>
            </div>
        </div>

    );

}
