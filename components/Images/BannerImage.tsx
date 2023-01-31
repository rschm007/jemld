import { IDefaultPropsWithChildren } from "@/@types"
import { motion } from "framer-motion";
import Link from "next/link";

export interface BannerImageProps extends IDefaultPropsWithChildren {
    src: string;
    href?: string;
    alt: string;
    title?: string;
    imgClasses?: string;
}

export const BannerImage = ({
    className = "",
    id,
    children,
    src,
    href,
    alt,
    title,
    imgClasses = ""
}: BannerImageProps) => {

    return (
        <motion.figure
            className={"group max-h-[40vh] relative z-20 " + className}
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
                    className={"object-cover w-full max-h-[40vh] object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray " + imgClasses}
                    src={src}
                    alt={alt}
                >
                    {children}
                </img>

                {title && (
                    <h2 className="-mt-20 mx-8 font-montserrat text-offWhite drop-shadow-sm tracking-wide font-bold md:font-normal text-lg md:text-xl absolute z-10 md:p-0 p-4 md:bg-transparent bg-darkGray md:bg-opacity-100 bg-opacity-90 rounded-lg md:rounded-none md:max-h-[unset] max-h-[12vh] truncate md:max-w-[unset] max-w-[85vw]">
                        {title}
                    </h2>
                )}
            </Link>

        </motion.figure>
    )
}