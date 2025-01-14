import { FormEvent, MutableRefObject, useRef, useState } from "react"
import FormWrap from "../FormWrap"
import { ErrorResponse } from "../../TreeNode/hooks/useTreeNode"

interface IAddNewNodeForm {
    title: string
    onClose: () => void
    postNewNode: (nodeName: string) => Promise<ErrorResponse>
}

function AddNewNodeForm(props: IAddNewNodeForm) {
    const { title, postNewNode, onClose } = props

    const [error, setError] = useState<string>('')
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>

    const sendNewNode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await postNewNode(inputRef.current.value)

        if (data?.error) {
            setError(data.error)
        }
    }

    return (
        <FormWrap title={title}>
            <div>
                <form onSubmit={sendNewNode}>
                    {error ? error : <input ref={inputRef} type="text" name="name" required placeholder="Enter new node name" />}
                    <div>
                        <button onClick={onClose}>Close</button>
                        {!error && <button type="submit">Create</button>}
                    </div>
                </form>
            </div>
        </FormWrap>
    )
}

export default AddNewNodeForm