import { IDefaultProps } from "@/@types";
import { hexToRgba, rgbaToHex } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { Nav } from "./Nav";
import Image from 'next/image'

export interface Props extends IDefaultProps {
    children?: JSX.Element | JSX.Element[];
}

export const Header = ({
    className = "",
    id,
    children
}: Props) => {
    const [sticky, setSticky] = useState(false);
    const [hidden, setHidden] = useState(false);
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
            setBgColor(hexToRgba("#166534", 0.6))
        } else {
            setBgColor("transparent");
        }
    }, [sticky])

    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const scrollTop = window.scrollY;

        if (scrollTop >= 100 && scrollTop <= 250) {
            setSticky(true);
        } else if (scrollTop >= 250) {
            setHidden(true);
        } else {
            setHidden(false);
            setSticky(false);
        }
    };

    return (
        <header
            className={"header-section fixed top-0 z-50 flex flex-row items-center justify-between w-full px-4 md:px-8 transition-all ease-in-out opacity-100 " +
                (hidden ? "!opacity-0 " : "") +
                (sticky ? "h-32 " : "h-48 ") +
                className
            }
            id={id}
            style={{
                backgroundColor: bgColor
            }}
        >
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
                {sticky ? (
                    <Image src="/JQLogo_full_white-text.svg" className="w-80" alt="JQ Lights" width="150" height="100" />
                ) : (
                    <Image src="/JQLogo_full_color.svg" className="w-80" alt="JQ Lights" width="150" height="100" />
                )}
            </a>

            <Nav scrolledDown={sticky} />
            {children}
        </header>
    )
}