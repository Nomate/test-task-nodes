import { useEffect, useState } from "react"
import TreeNode from "../TreeNode"
import { ITreeNode } from "../../types"
import { API_URL } from "../../constants/api"

const TREE_GUID = 'a0b41102-ea2f-410b-8dca-9e1310ed2esa'

function TreeWrapper() {
    const [shouldFetch, setShouldFetch] = useState(true)
    const [dataTree, setDataTree] = useState<ITreeNode>({
        id: 0,
        name: '',
        children: []
    })
    const [activeId, setActiveId] = useState<number>(0)
    const [error, setError] = useState('')


    useEffect(() => {
        if (shouldFetch) {
            setShouldFetch(!shouldFetch)

            const getTreeNodes = async () => {
                const response = await fetch(`${API_URL}/api.user.tree.get?${new URLSearchParams({
                    "treeName": TREE_GUID
                })}`, {
                    method: 'POST',
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

                    setError(errorMessage)
                    return null
                }

                const data = await response.json()

                setDataTree({
                    id: data.id,
                    name: data.name,
                    children: [{
                        id: data.id,
                        name: 'Root',
                        isRoot: true,
                        children: [...data.children],
                    }]
                })
            }

            try {
                getTreeNodes()
            } catch (e) {
                console.log(e)
            }
        }
    }, [shouldFetch])

    return (
        error ? <div>{error}</div> : <ul>
            {dataTree.children.map((node) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    treeName={TREE_GUID}
                    activeId={activeId}
                    handleActiveId={setActiveId}
                    handleTriggerRefetch={setShouldFetch}
                />
            ))}
        </ul>
    )
}

export default TreeWrapper
