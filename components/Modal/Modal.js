import { useRef, useEffect } from 'react';

import classes from './Modal.module.css';

const Modal = ({ isOpen, toggleModal, children }) => {
    const modalRef = useRef(null);
    const handleCloseModal = event => {
        if (modalRef.current === event.target) {
            toggleModal();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    return (
        <div
            ref={modalRef}
            onClick={toggleModal === undefined ? null : handleCloseModal}
            className={`${classes['modal']} ${isOpen ? 'd-flex' : 'd-none'}`}>
            <div className={classes['modal-content']}>{children}</div>
        </div>
    );
};

export default Modal;
