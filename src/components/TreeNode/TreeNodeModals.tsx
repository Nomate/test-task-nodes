import AddNewNodeForm from "../Forms/AddNewNodeForm"
import EditNodeForm from "../Forms/EditNodeForm"
import RemoveNodeForm from "../Forms/RemoveNodeForm"
import Modal from "../Modal"
import { ErrorResponse } from "./hooks/useTreeNode"

interface IModalOpened {
    type: string
    isOpened: boolean
}

interface ITreeNodeModal {
    isModalOpened: IModalOpened
    onClose: () => void
    postNewNode: (name: string) => Promise<ErrorResponse>
    removeNode: () => Promise<ErrorResponse>
    editNode: (name: string) => Promise<ErrorResponse | undefined>
    name: string
}

function TreeNodeModals(props: ITreeNodeModal) {
    const { isModalOpened, onClose, postNewNode, editNode, removeNode, name } = props

    return (
        <>
            <Modal isOpen={isModalOpened.type === 'add' && isModalOpened.isOpened} onClose={onClose}>
                <AddNewNodeForm title="Add new Node" postNewNode={postNewNode} onClose={onClose} />
            </Modal>
            <Modal isOpen={isModalOpened.type === 'edit' && isModalOpened.isOpened} onClose={onClose}>
                <EditNodeForm title="Edit node" editNode={editNode} onClose={onClose} name={name} />
            </Modal>
            <Modal isOpen={isModalOpened.type === 'remove' && isModalOpened.isOpened} onClose={onClose}>
                <RemoveNodeForm title="Delete" removeNode={removeNode} onClose={onClose} name={name} />
            </Modal>
        </>
    )
}

export default TreeNodeModals