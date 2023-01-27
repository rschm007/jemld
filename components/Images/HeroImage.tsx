import { IDefaultPropsWithChildren } from "@/@types"
import { motion } from "framer-motion";

export interface HeroImageProps extends IDefaultPropsWithChildren {
    src: string;
    alt: string;
    imgClasses?: string;
}

export const HeroImage = ({
    className = "",
    id,
    children,
    src,
    alt,
    imgClasses = ""
}: HeroImageProps) => {

    return (
        <motion.figure
            className={"max-h-[80vh] relative " + className}
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
            <img
                className={"object-cover w-full max-h-[80vh] object-bottom relative bg-darkGray" + imgClasses}
                src={src}
                alt={alt}
            >
                {children}
            </img>
        </motion.figure>
    )
}