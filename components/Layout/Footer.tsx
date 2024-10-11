import { IDefaultPropsWithChildren } from "@/@types"
import Image from 'next/image'

export const Footer = ({
    className = "",
    id,
    children
}: IDefaultPropsWithChildren) => {

    return (
        <footer className={"flex flex-col w-full h-[25rem] md:h-48 bg-neutral-900 " + className} id={id}>
            <div className="flex flex-col md:flex-row w-full justify-between items-center px-8 md:px-20 pt-8 space-y-4">

                <div className="flex flex-col items-start justify-start">
                    <span className="font-montserrat font-semibold text-lg text-offWhite">
                        © 2022 Jacqueline E. Malenke.
                    </span>

                    <a className="font-montserrat font-normal text-base underline text-offWhite" href="mailto:jem@jemld.com">
                        jem@jemld.com
                    </a>
                </div>

                <Image src="/JQLogo_full_white-text.svg" className="w-48" alt="JQ Lights" width="120" height="75" />

            </div>

            {children}
        </footer>
    )
}