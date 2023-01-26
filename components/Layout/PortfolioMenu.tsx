import { IDefaultProps } from "@/@types"
import { hexToRgba } from "@/utils";
import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import { Fragment } from "react"

export interface PortfolioMenuProps extends IDefaultProps {
    linkStyles: string;
    scrolledDown: boolean;
}

export const PortfolioMenu = ({
    className = "",
    id,
    linkStyles, scrolledDown
}: PortfolioMenuProps) => {

    return (
        <Menu>
            <Menu.Button className={linkStyles}>Portfolio</Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="flex flex-col absolute !mr-[13rem] mt-[7rem] origin-top-right divide-y divide-gray-100 bg-white shadow-lg focus:outline-none"
                    style={{ backgroundColor: scrolledDown ? `${hexToRgba("#a78bfa", 1)}` : `${hexToRgba("#a78bfa", 0.8)}` }}
                >
                    <div className="flex flex-col items-center justify-start p-2">
                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles + "text-offWhite"} href="/portfolio/theatre">
                                    Theatre
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles + "text-offWhite"} href="/portfolio/dance">
                                    Dance
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles + "text-offWhite"} href="/portfolio/cadDesign">
                                    CAD Design
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}