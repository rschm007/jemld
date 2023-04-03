import { IDefaultPropsWithChildren } from "@/@types"
import { ContactForm } from "../Form"
import { SocialMediaIcons } from "./SocialMediaIcons"

export const Footer = ({
    className = "",
    id,
    children
}: IDefaultPropsWithChildren) => {

    return (
        <footer className={"flex flex-col w-full h-48 bg-darkGray mt-4 " + className} id={id}>
            <div className="flex flex-col md:flex-row w-full justify-between px-12 md:px-32 pt-16 space-y-4">

                <div className="flex flex-col items-start md:items-center justify-start">
                    <span className="font-montserrat font-semibold text-base text-offWhite">
                        © 2022 Jacqueline E. Malenke.
                    </span>
                </div>

                <SocialMediaIcons linkedIn />
            </div>

            {children}
        </footer>
    )
}