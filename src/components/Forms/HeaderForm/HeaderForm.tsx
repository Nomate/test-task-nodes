interface IHeaderForm {
    title: string
}
function HeaderForm(props: IHeaderForm) {
    const { title } = props

    return (
        <div>{title}</div>
    )
}

export default HeaderForm