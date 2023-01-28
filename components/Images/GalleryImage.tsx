import { IDefaultPropsWithChildren } from "@/@types"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface GalleryImageProps extends IDefaultPropsWithChildren {
    src: string;
    alt: string;
    imgClasses?: string;
}

export const GalleryImage = ({
    className = "",
    id,
    children,
    src,
    alt,
    imgClasses = ""
}: GalleryImageProps) => {

    return (
        <motion.figure
            className={"group max-h-[80vh] relative z-20 " + className}
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
            <Link target="_blank" href={src}>
                <img
                    className={"object-cover w-full max-h-[80vh] object-bottom relative bg-darkGray " + imgClasses}
                    src={src}
                    alt={alt}
                >
                    {children}
                </img>
            </Link>
        </motion.figure>
    )
}