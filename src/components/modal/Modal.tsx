import React from "react";

interface ModalProps {
    isOpen: boolean
    closeModal: () => void
    children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({isOpen, closeModal, children}) => {
    if (!isOpen) return null;

    return (
        <div onClick={() => closeModal()} className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center">
            <div className="relative bg-white w-96 max-w-full mx-auto rounded-lg p-2">
                <div className={"flex justify-end"}>
                    <button
                        className="bg-slate-300 rounded-full w-8 p-1 hover:text-imperial ease-in-out duration-100"
                        onClick={() => closeModal()}
                    >
                        <div> &#x2715;</div>
                    </button>
                </div>
                <div className={"text-left"}>
                    {children}
                </div>
            </div>
        </div>
    );
}