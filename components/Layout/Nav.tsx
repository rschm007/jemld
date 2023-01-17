import { DefaultProps } from "@/@types";
import Link from "next/link";
import { PortfolioMenu } from "./PortfolioMenu";

export const linkStyles = "font-montserrat font-semibold text-sm";

export const Nav = ({
    className = "",
    id
}: DefaultProps) => {

    return (
        <nav className="flex flex-row items-center justify-end w-full h-full space-x-4 pr-12">
            <Link href="/" className={linkStyles}>
                Home
            </Link>

            <PortfolioMenu />

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