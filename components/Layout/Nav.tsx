import { IDefaultProps } from "@/@types";
import Link from "next/link";
import { PortfolioMenu } from "./PortfolioMenu";

export interface NavProps extends IDefaultProps {
    scrolledDown: boolean;
}

export const Nav = ({
    className = "",
    id,
    scrolledDown
}: NavProps) => {
    const linkStyles = "font-montserrat font-semibold text-base tracking-wide transition ease-in-out delay-75 " + (scrolledDown ? "!text-offWhite " : "");

    return (
        <nav className={"flex flex-row items-center justify-end w-full h-full space-x-4 pr-12 " + className} id={id}>
            <Link href="/" className={linkStyles}>
                Home
            </Link>

            <PortfolioMenu linkStyles={linkStyles} />

            <Link href="/" className={linkStyles}>
                Resume
            </Link>

            <Link href="/" className={linkStyles}>
                About
            </Link>

            <Link href="/" className={linkStyles}>
                Contact
            </Link>
        </nav>
    )
}