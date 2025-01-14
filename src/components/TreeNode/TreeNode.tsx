import { ITreeNode } from '../../types'
import styles from './TreeNode.module.scss'
import AddIcon from '../../icons/Add'
import EditIcon from '../../icons/Edit'
import clsx from 'clsx'
import ArrowIcon from '../../icons/Arrow'
import TreeNodeModals from './TreeNodeModals'
import useTreeNode from './hooks/useTreeNode'
import RemoveIcon from '../../icons/Remove'

export type THandleActiveId = (id: number) => void

interface ITreeNodeProps {
    node: ITreeNode
    activeId: number
    handleActiveId: THandleActiveId
    handleTriggerRefetch: (shouldRefetch: boolean) => void
    treeName: string
}

const TreeNode = (props: ITreeNodeProps) => {
    const { node, activeId, handleActiveId, handleTriggerRefetch, treeName } = props

    const { toggleOpenNode, isOpen, openAddModal, openEditModal, onModalClose, removeNode, openRemoveModal, isModalOpened, editNode, postNewNode } = useTreeNode({
        handleActiveId, node, handleTriggerRefetch, treeName,
    })

    const isCurrentNode = activeId === node.id

    return (
        <>
            <li className={styles.TreeNodeChildren}>
                <div
                    onClick={toggleOpenNode}
                    className={clsx(styles.TreeNodeWrap, isCurrentNode && styles.TreeNodeWrapActive)}
                >
                    {!!node?.children?.length &&
                        <ArrowIcon className={clsx(styles.TreeNodeChildrenArrow, isOpen && styles.TreeNodeChildrenArrowOpened)} />}
                    {node.name}
                    {
                        isCurrentNode && (
                            <>
                                <AddIcon className={clsx(styles.TreeNodeIcon, styles.TreeNodeAddIcon)} onClick={openAddModal} />
                                {!node.isRoot && <EditIcon className={clsx(styles.TreeNodeIcon, styles.TreeNodeEditIcon)} onClick={openEditModal} />}
                                {!node.isRoot && <RemoveIcon className={clsx(styles.TreeNodeIcon, styles.TreeNodeRemoveIcon)} onClick={openRemoveModal} />}
                            </>
                        )
                    }
                </div>
                {isOpen && !!node?.children?.length && (
                    <ul className={styles.TreeNodeChildrenList}>
                        {node.children.map((child) => (
                            <TreeNode
                                treeName={treeName}
                                key={child.id}
                                node={child}
                                activeId={activeId}
                                handleActiveId={handleActiveId}
                                handleTriggerRefetch={handleTriggerRefetch}
                            />
                        ))}
                    </ul>
                )}
            </li>
            <TreeNodeModals
                onClose={onModalClose}
                isModalOpened={isModalOpened}
                postNewNode={postNewNode}
                removeNode={removeNode}
                name={node.name}
                editNode={editNode}
            />
        </>
    )
}

export default TreeNode