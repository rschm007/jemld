import { IDefaultProps } from "@/@types";
import Link from "next/link";
import { useRouter } from "next/router";
import { PortfolioMenu } from "./PortfolioMenu";

export interface NavProps extends IDefaultProps {
    scrolledDown: boolean;
}

export const Nav = ({
    className = "",
    id,
    scrolledDown
}: NavProps) => {
    const router = useRouter();

    const linkStyles = "font-montserrat font-semibold text-base tracking-wide transition ease-in-out delay-75 hover:scale-110 " + (scrolledDown ? "!text-offWhite " : "");

    return (
        <nav className={"flex flex-row items-center justify-end w-full h-full space-x-4 pr-12 " + className} id={id}>
            <Link href="/" className={linkStyles + (router.pathname === "/" ? "active-link" : "")}>
                Home
            </Link>

            <PortfolioMenu linkStyles={linkStyles + (router.pathname.includes("portfolio") ? "active-link" : "")} scrolledDown={scrolledDown} />

            <Link href="/resume" className={linkStyles + (router.pathname === "/resume" ? "active-link" : "")}>
                Resume
            </Link>

            <Link href="/about" className={linkStyles + (router.pathname === "/about" ? "active-link" : "")}>
                About
            </Link>

            <Link href="/contact" className={linkStyles + (router.pathname === "/contact" ? "active-link" : "")}>
                Contact
            </Link>
        </nav>
    )
}