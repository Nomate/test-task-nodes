import { useState } from "react"
import { ITreeNode, TEvent } from "../../../types"
import { THandleActiveId } from "../TreeNode"
import { API_URL } from "../../../constants/api"

const CANNOT_BE_EMPTY_ERROR = { error: "Node name cannot be empty" }

interface IUseTreeNodeProps {
    handleActiveId: THandleActiveId
    node: ITreeNode
    handleTriggerRefetch: (shouldRefetch: boolean) => void
    treeName: string
}

interface IApiRequest {
    operation: string,
    params: URLSearchParams,
    method: string,
    name?: string
}

export interface ErrorResponse {
    error?: string;
}

function useTreeNode(props: IUseTreeNodeProps) {
    const { handleActiveId, node, handleTriggerRefetch, treeName } = props

    const [isOpen, setIsOpenNode] = useState<boolean>(false)
    const [isModalOpened, setIsModalOpened] = useState({
        type: '',
        isOpened: false
    })

    const toggleOpenNode = (e: TEvent) => {
        e.preventDefault()
        setIsOpenNode(!isOpen)
        handleActiveId(node.id)
    }

    const onModalClose = () => {
        setIsModalOpened({
            type: '',
            isOpened: false
        })
    }

    const openAddModal = (e: TEvent) => {
        e.stopPropagation()
        setIsModalOpened({
            type: 'add',
            isOpened: true
        })
    }

    const apiRequest = async ({ operation, params, method }: IApiRequest): Promise<ErrorResponse> => {
        try {
            const response = await fetch(`${API_URL}/api.user.tree.node.${operation}?${params}`, {
                method,
            })

            if (!response.ok) {
                let errorData
                try {
                    errorData = await response.json()
                } catch (parseError) {
                    const text = await response.text()
                    return { error: text }
                }

                const errorMessage = errorData?.data?.message || errorData?.message
                return { error: errorMessage }
            }

            handleTriggerRefetch(true)
            onModalClose()

            return {}
        } catch (e) {
            console.log(e)
            throw new Error('Something went wrong')
        }

    }

    const postNewNode = async (nodeName: string): Promise<ErrorResponse> => {
        if (!nodeName.trim()) {
            return CANNOT_BE_EMPTY_ERROR
        }

        const result = await apiRequest({
            operation: 'create',
            params: new URLSearchParams({
                treeName,
                "parentNodeId": String(node.id),
                nodeName: nodeName.trim()
            }),
            method: 'POST',
            name: nodeName,
        })


        return result
    }

    const editNode = async (newNodeName: string) => {
        if (!newNodeName.trim()) {
            return CANNOT_BE_EMPTY_ERROR
        }

        if (newNodeName === node.name) {
            onModalClose()
            return
        }

        const result = await apiRequest({
            operation: 'rename',
            params: new URLSearchParams({
                treeName,
                "nodeId": String(node.id),
                newNodeName: newNodeName.trim()
            }),
            method: 'POST',
        })


        return result
    }

    const removeNode = async () => {
        const result = await apiRequest({
            operation: 'delete',
            params: new URLSearchParams({
                treeName,
                "nodeId": String(node.id),
            }),
            method: 'POST',
        })


        return result
    }

    const openEditModal = (e: TEvent) => {
        e.stopPropagation()
        setIsModalOpened({
            type: 'edit',
            isOpened: true
        })
    }

    const openRemoveModal = (e: TEvent) => {
        e.stopPropagation()
        setIsModalOpened({
            type: 'remove',
            isOpened: true
        })
    }


    return {
        openAddModal, openEditModal, onModalClose, isModalOpened, editNode,
        toggleOpenNode, isOpen, postNewNode, openRemoveModal, removeNode
    }
}

export default useTreeNode