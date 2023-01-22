import { IDefaultProps } from "@/@types";
import { hexToRgba, rgbaToHex } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { LogoSmall } from "../Logos";
import { Nav } from "./Nav";

export interface Props extends IDefaultProps {
    children?: JSX.Element | JSX.Element[];
}

export const Header = ({
    className = "",
    id,
    children
}: Props) => {
    const [sticky, setSticky] = useState(false);
    const [bgColor, setBgColor] = useState("transparent");

    // Sticky Menu Area
    useEffect(() => {
        window.addEventListener('scroll', isSticky);

        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    }, []);

    useEffect(() => {
        if (sticky) {
            setBgColor(hexToRgba("#a78bfa", 0.6))
        } else {
            setBgColor("transparent");
        }
    }, [sticky])

    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const scrollTop = window.scrollY;

        if (scrollTop >= 150) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    return (
        <header
            className={"header-section fixed top-0 z-50 flex flex-row items-center justify-between w-full  px-8 transition-all ease-in-out " +
                (sticky ? "h-32 " : "h-48 ") + className}
            id={id}
            style={{
                backgroundColor: bgColor
            }}
        >
            <Link href="/">
                <LogoSmall
                    className={sticky ? "h-48 w-48" : "h-64 w-64"}
                    fill={sticky ? "#FDFDF0" : "#111111"}
                />
            </Link>

            <Nav scrolledDown={sticky} />
            {children}
        </header>
    )
}