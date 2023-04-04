import { IDefaultPropsWithChildren } from "@/@types"
import { motion } from "framer-motion";
import Link from "next/link";

export interface PanelImageProps extends IDefaultPropsWithChildren {
    src: string;
    href?: string;
    alt: string;
    title?: string;
    imgClasses?: string;
    titleClasses?: string;
}

export const PanelImage = ({
    className = "",
    id,
    children,
    src,
    href,
    alt,
    title,
    imgClasses = "",
    titleClasses = ""
}: PanelImageProps) => {

    return (
        <motion.figure
            className={"group max-h-[75vh] min-h-[75vh] relative z-20 py-1 " + className}
            id={id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
        >

            <Link
                href={href}
            >
                <img
                    className={"object-cover w-full h-full object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray " + imgClasses}
                    src={src}
                    alt={alt}
                >
                    {children}
                </img>

                {title && (
                    <h2 className={"-mt-24 font-playfair uppercase text-offWhite w-full text-center drop-shadow-sm tracking-wide font-bold md:font-normal text-2xl md:text-4xl absolute z-10 px-4 py-1 bg-darkGray md:bg-opacity-30 bg-opacity-90 rounded-lg md:rounded-none md:max-h-[unset] max-h-[12vh] md:max-w-[unset] max-w-[85vw] " + titleClasses}>
                        {title === "installationExhibit" ? "Installation & Exhibit" : title}
                    </h2>
                )}
            </Link>

        </motion.figure>
    )
}