import { IDefaultPropsWithChildren } from "@/@types"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image'
import { useState } from "react";
import { FadeLoader } from "react-spinners";

export interface PanelImageProps extends IDefaultPropsWithChildren {
    src: string;
    href?: string;
    alt: string;
    title?: string;
    imgClasses?: string;
    titleClasses?: string;
    quality?: number;
    loadingStrategy?: "eager" | "lazy";
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
    titleClasses = "",
    quality = 100,
    loadingStrategy = "eager"
}: PanelImageProps) => {
    const [loading, setLoading] = useState(true);

    return (
        <motion.figure
            className={"group md:max-h-[75vh] md:min-h-[75vh] relative z-20 py-1 " + className}
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
                <FadeLoader
                    className="relative w-full h-full z-50 self-center justify-self-center !left-[45%] !top-[45%]"
                    color="white"
                    loading={loading}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />

                <Image
                    className={"object-cover w-full h-full object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray " + (loading
                        ? "blur-lg"
                        : "blur-0"
                    ) + imgClasses}
                    src={src}
                    alt={alt}
                    width={250}
                    height={500}
                    unoptimized={quality === 100}
                    quality={quality}
                    loading={loadingStrategy}
                    onLoadingComplete={() => setLoading(false)}
                >
                    {children}
                </Image>

                {title && (
                    <h2 className={"-mt-24 font-playfair uppercase text-offWhite w-full text-center drop-shadow-sm tracking-wide font-normal text-4xl absolute z-10 px-4 py-1 bg-darkGray md:bg-opacity-30 bg-opacity-90 rounded-r-lg md:rounded-none md:max-h-[unset] max-h-[12vh] md:max-w-[unset] max-w-[85vw] " + titleClasses}>
                        {title === "installationExhibit" ? "Installation & Exhibit" : title}
                    </h2>
                )}
            </Link>

        </motion.figure >
    )
}