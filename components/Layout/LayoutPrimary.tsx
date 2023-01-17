import { DefaultProps } from "@/@types";
import { Header } from "./Header";

export interface LayoutPrimaryProps extends DefaultProps {
    children: JSX.Element | JSX.Element[];
}

export const LayoutPrimary = ({
    className = "",
    id,
    children
}: LayoutPrimaryProps) => {

    return (
        <div className={"w-full h-full " + className} id={id}>
            <Header />
            {children}
        </div>
    )
}