import React, { FormEventHandler } from "react";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    handleSubmit: FormEventHandler<HTMLFormElement>;
}

const Modal: React.FC<ModalProps> = ({modalOpen, setModalOpen, children, handleSubmit}) => {
    return (
        <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
            <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            {children}
        </form>
        </dialog>
    );
}

export default Modal;
