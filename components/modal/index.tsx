import { forwardRef } from "react";

type modalProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    hidden: boolean;
    onClose: () => void;
};

const Modal = forwardRef<HTMLDivElement, modalProps>(function ModalIn({ id, title, hidden, children, onClose, className, ...props }, ref) {
    const handleClose = (e: any) => {
        if (e.target.id !== id) return;
        onClose();
    };
    if (hidden) return null;
    return (
        <div
            id={id}
            aria-hidden="true"
            className="fixed top-0 h-screen inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            onClick={handleClose}
        >
            <div className="relative w-full max-w-2xl max-h-full ">
                <div className="relative max-h-10/12  rounded-lg shadow">
                    <div className="flex items-start bg-slate-200 justify-between p-4 border-b rounded-t">
                        <h3 className="text-xl font-semibold truncate">{title}</h3>
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="default-modal"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className={`p-6 space-y-6 flex-column max-h-[80vh] overflow-y-scroll ${className}`}>{children ? children : null}</div>
                </div>
            </div>
        </div>
    );
});
export default Modal;
