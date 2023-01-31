import { IDefaultProps } from "@/@types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MenuHamburger from "../GUI/MenuHamburger";
import { PortfolioMenu } from "./PortfolioMenu";

export interface NavProps extends IDefaultProps {
    scrolledDown: boolean;
}

export const Nav = ({
    className = "",
    id,
    scrolledDown
}: NavProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const linkStyles = "font-montserrat font-semibold text-base tracking-wide transition ease-in-out delay-75 hover:scale-110 " + (scrolledDown ? "!text-offWhite " : "");
    const mobileLinkStyles = "font-montserrat text-[#fff] font-semibold text-2xl tracking-wide transition-all ease-in-out delay-75 hover:scale-110"

    return (
        <nav className={"flex flex-row items-center justify-center md:justify-end w-full h-full space-x-4 md:pr-12 " + className} id={id}>
            {/*  desktop nav */}
            <div className=" flex-row items-center space-x-4 hidden md:flex">
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
            </div>

            {/* mobile nav */}
            <div className={"md:hidden flex relative transition-all duration-300 delay-75 " + (open ? "!absolute !m-0 w-screen h-screen inset-0 bg-lavender z-[999]" : "")}>
                <MenuHamburger
                    className={(open ? "rotate-90 " : "") + (open ? "absolute right-20 top-20" : "")}
                    color={!open ? (scrolledDown ? "white" : "dark") : "white"}
                    onClick={() => setOpen(!open)}
                />

                <div className={"w-full h-full flex-col items-center justify-center space-y-4 " + (open ? "flex" : "hidden")}>
                    <Link href="/" className={mobileLinkStyles + (router.pathname === "/" ? "active-link" : "")}>
                        Home
                    </Link>

                    <PortfolioMenu linkStyles={mobileLinkStyles + (router.pathname.includes("portfolio") ? "active-link" : "")} scrolledDown={scrolledDown} />

                    <Link href="/resume" className={mobileLinkStyles + (router.pathname === "/resume" ? "active-link" : "")}>
                        Resume
                    </Link>

                    <Link href="/about" className={mobileLinkStyles + (router.pathname === "/about" ? "active-link" : "")}>
                        About
                    </Link>

                    <Link href="/contact" className={mobileLinkStyles + (router.pathname === "/contact" ? "active-link" : "")}>
                        Contact
                    </Link>
                </div>

            </div>
        </nav>
    )
}