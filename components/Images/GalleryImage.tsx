import { IDefaultPropsWithChildren } from "@/@types"
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
        <figure
            className={"group max-h-[80vh] relative " + className}
            id={id}
        >
            <Link target="_blank" href={src}>
                <img
                    className={"object-cover w-full max-h-[80vh] object-bottom relative" + imgClasses}
                    src={src}
                    alt={alt}
                >
                    {children}
                </img>
            </Link>
        </figure>
    )
}