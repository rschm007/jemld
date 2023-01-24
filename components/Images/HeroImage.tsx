import { IDefaultPropsWithChildren } from "@/@types"

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
        <figure
            className={"max-h-[80vh] relative " + className}
            id={id}
        >
            <img
                className={"object-cover w-full max-h-[80vh] object-bottom relative" + imgClasses}
                src={src}
                alt={alt}
            >
                {children}
            </img>
        </figure>
    )
}