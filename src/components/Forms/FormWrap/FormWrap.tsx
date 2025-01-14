import { ReactNode } from "react"
import HeaderForm from "../HeaderForm"
import styles from './FormWrap.module.scss'

interface IFormWrap {
    children: ReactNode
    title: string
}

function FormWrap(props: IFormWrap) {
    const { children, title } = props

    return (
        <div className={styles.FormWrap}>
            <HeaderForm title={title} />
            {children}
        </div>
    )
}

export default FormWrap