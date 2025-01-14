import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'

interface IModal {
    isOpen: boolean
    onClose?: () => void
    children: ReactNode
}

const Modal = (props: IModal) => {
    const { isOpen = true, children } = props
    if (!isOpen) return null

    const id: HTMLElement | null = document.getElementById('modal')

    if (!id) {
        return null
    }

    return createPortal(
        <div className={styles.ModalOverlay}>
            <div className={styles.ModalContent}>
                {children}
            </div>
        </div>,
        id
    );
};

export default Modal