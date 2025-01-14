import { FormEvent, MutableRefObject, useRef, useState } from "react"
import FormWrap from "../FormWrap"
import { ErrorResponse } from "../../TreeNode/hooks/useTreeNode"

interface IEditNodeForm {
    title: string
    onClose: () => void
    editNode: (name: string) => Promise<ErrorResponse | undefined>
    name: string
}

function EditNodeForm(props: IEditNodeForm) {
    const { title, editNode, onClose, name } = props

    const [error, setError] = useState<string>('')
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>

    const renameNode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await editNode(inputRef.current.value)

        if (data?.error) {
            setError(data.error)
        }
    }

    return (
        <FormWrap title={title}>
            <div>
                <form onSubmit={renameNode}>
                    {error ? error : <input ref={inputRef} type="text" name="name" defaultValue={name} required placeholder="Edit node name" />}
                    <div>
                        <button onClick={onClose}>Close</button>
                        {!error && <button type="submit">Edit</button>}
                    </div>
                </form>
            </div>
        </FormWrap>
    )
}

export default EditNodeForm