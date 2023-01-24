import { IDefaultPropsWithChildren } from "@/@types";

export interface BannerHeaderProps extends IDefaultPropsWithChildren {
    text: string;
}

export const BannerHeader = ({
    className = "",
    id,
    children,
    text
}: BannerHeaderProps) => {

    return (
        <div className={"flex flex-row items-center justify-center w-fill h-36 " + className} id={id}>
            <h2 className="text-center font-bold text-[2.5rem]">
                {text}
            </h2>
            {children}
        </div>
    )
}

export default BannerHeader;