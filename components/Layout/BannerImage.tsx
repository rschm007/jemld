import { IDefaultPropsWithChildren } from "@/@types"
import Image from "next/image";
import Link from "next/link";

export interface BannerImageProps extends IDefaultPropsWithChildren {
    src: string;
    href?: string;
    alt: string;
    title: string;
}

export const BannerImage = ({
    className = "",
    id,
    children,
    src,
    href = "#",
    alt,
    title = "Image"
}: BannerImageProps) => {

    return (
        <article
            className={"max-h-[40vh] relative " + className}
            id={id}
        >
            <Link
                href={href}
                target="_blank"
            >
                <img
                    className={"object-cover w-full max-h-[40vh] object-bottom relative z-0"}
                    src={src}
                    alt={alt}
                >
                    {children}
                </img>

                <h2 className="-mt-20 mx-8 font-montserrat text-offWhite tracking-wide font-normal text-xl absolute z-10">
                    {title}
                </h2>
            </Link>
        </article>
    )
}