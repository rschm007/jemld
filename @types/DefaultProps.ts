/**
 * @description className and id. Extend this to add additional props
 */
export interface IDefaultProps {
    className?: string;
    id?: string;
}

export interface IDefaultPropsWithChildrenRequired extends IDefaultProps {
    children: JSX.Element | JSX.Element[];
}

export interface IDefaultPropsWithChildren extends IDefaultProps {
    children?: JSX.Element | JSX.Element[];
}