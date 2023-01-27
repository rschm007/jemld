import { IDefaultPropsWithChildren } from "@/@types"
import { SocialMediaIcons } from "./SocialMediaIcons"

export const Footer = ({
    className = "",
    id,
    children
}: IDefaultPropsWithChildren) => {

    return (
        <footer className={"flex flex-col w-full h-80 min-h-[15rem] bg-darkGray mt-4 " + className} id={id}>
            <div className="flex flex-row w-full justify-between px-32 pt-16">

                <div className="flex flex-col items-center justify-start">
                    <span className="font-montserrat font-semibold text-base text-offWhite">
                        © 2022 Jacqueline E Malenke.
                    </span>
                </div>

                <SocialMediaIcons linkedIn />
            </div>

            {children}
        </footer>
    )
}