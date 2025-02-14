import { IDefaultProps } from "@/@types"
import { hexToRgba } from "@/utils";
import { Menu, Popover, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router";
import { Fragment } from "react"

export interface PortfolioMenuProps extends IDefaultProps {
    linkStyles: string;
    scrolledDown: boolean;
}

export const PortfolioMenu = ({
    className = "",
    id,
    linkStyles,
    scrolledDown
}: PortfolioMenuProps) => {
    const router = useRouter();

    return (
        <Menu>
            <Menu.Button className={linkStyles + (router.pathname.includes("portfolio") && router.pathname.toLowerCase().indexOf("process") === -1 ? "active-link" : "")}>Portfolio</Menu.Button>
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
                    className="flex flex-col relative md:absolute md:!ml-[7rem] md:mt-[7rem] origin-top-right divide-y divide-gray-100 bg-white shadow-lg focus:outline-none"
                    style={{ backgroundColor: scrolledDown ? `${hexToRgba("#166534", 1)}` : `${hexToRgba("#166534", 0.8)}` }}
                >
                    <div className="flex flex-col items-center justify-start p-2">

                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/portfolio/design/theatre" passHref legacyBehavior>
                                    <a className={linkStyles + " text-offWhite !no-underline"}>
                                        Theatre
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link href="/portfolio/design/dance" passHref legacyBehavior>
                                    <a className={linkStyles + " text-offWhite !no-underline"}>
                                        Dance
                                    </a>
                                </Link>
                            )}
                        </Menu.Item>

                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}