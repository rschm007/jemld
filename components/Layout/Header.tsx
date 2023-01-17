import { DefaultProps } from "@/@types";
import { Logo } from "../Logo";
import { Nav } from "./Nav";

export interface Props extends DefaultProps {
    children?: JSX.Element | JSX.Element[];
}

export const Header = ({
    className = "",
    id,
    children
}: Props) => {

    return (
        <header className="w-full h-24 p-8">
            <Logo className="h-52 w-52" />
            <Nav />
            {children}
        </header>
    )
}