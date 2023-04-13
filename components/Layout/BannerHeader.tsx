import { IDefaultPropsWithChildren } from "@/@types";
import { useEffect, useState } from "react";

export interface BannerHeaderProps extends IDefaultPropsWithChildren {
    text: string;
}

export const BannerHeader = ({
    className = "",
    id,
    children,
    text
}: BannerHeaderProps) => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', isHidden);

        return () => {
            window.removeEventListener('scroll', isHidden);
        };
    }, []);

    /* Method that will fix header after a specific scrollable */
    const isHidden = (e) => {
        const scrollTop = window.scrollY;

        if (scrollTop >= 100) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    };

    return (
        <div className={"flex flex-row items-center justify-center w-full h-36 opacity-100 transition-all ease-in-out duration-300 " + (hidden ? "!opacity-0" : "") + className} id={id}>
            <h2 className="text-center text-[2.5rem]">
                {text}
            </h2>
            {children}
        </div>
    )
}

export default BannerHeader;