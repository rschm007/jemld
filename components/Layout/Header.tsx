import { DefaultProps } from "@/@types";
import Link from "next/link";
import { LogoSmall } from "../Logos";
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
        <header className="flex flex-row items-center justify-between w-full h-24 p-8 mt-20">
            <Link href="/">
                <LogoSmall className="h-64 w-64" />
            </Link>

            <Nav />
            {children}
        </header>
    )
}