import { IDefaultPropsWithChildren } from "@/@types"
import Image from "next/image";
import Link from "next/link";

export interface BannerImageProps extends IDefaultPropsWithChildren {
    src: string;
    href?: string;
    alt: string;
    title: string;
    imgClasses?: string;
}

export const BannerImage = ({
    className = "",
    id,
    children,
    src,
    href = "#",
    alt,
    title = "Image",
    imgClasses = ""
}: BannerImageProps) => {

    return (
        <article
            className={"group max-h-[40vh] relative " + className}
            id={id}
        >
            <Link
                href={href}
            >
                <img
                    className={"object-cover w-full max-h-[40vh] object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0" + imgClasses}
                    src={src}
                    alt={alt}
                >
                    {children}
                </img>

                <h2 className="-mt-20 mx-8 font-montserrat text-offWhite drop-shadow-sm tracking-wide font-normal text-xl absolute z-10">
                    {title}
                </h2>
            </Link>
        </article>
    )
}