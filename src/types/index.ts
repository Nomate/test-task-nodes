export interface ITreeNode {
    id: number
    name: string
    isRoot?: boolean
    children: ITreeNode[]
}

export type TEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

export interface IIconsProps {
    className: string
    onClick?: (e: TEvent) => void
}