import { FormEvent, useState } from "react"
import FormWrap from "../FormWrap"
import { ErrorResponse } from "../../TreeNode/hooks/useTreeNode"

interface IRemoveNodeForm {
    title: string
    onClose: () => void
    removeNode: () => Promise<ErrorResponse>
    name: string
}

function RemoveNodeForm(props: IRemoveNodeForm) {
    const { title, removeNode, onClose, name } = props

    const [error, setError] = useState<string>('')

    const removeCurrentNode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await removeNode()

        if (data?.error) {
            setError(data.error)
        }
    }

    return (
        <FormWrap title={title}>
            {error ? error : <div>Do you want to delete <b>{name}</b>?</div>}
            <form onSubmit={removeCurrentNode}>
                <div>
                    <button onClick={onClose}>Close</button>
                    {!error && <button type="submit">Delete</button>}
                </div>
            </form>
        </FormWrap>
    )
}

export default RemoveNodeForm