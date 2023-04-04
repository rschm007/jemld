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
            <Menu.Button className={linkStyles + (router.pathname.includes("portfolio") ? "active-link" : "")}>Portfolio</Menu.Button>
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
                    className="flex flex-col relative md:absolute !md:ml-[15rem] md:mt-[9rem] origin-top-right divide-y divide-gray-100 bg-white shadow-lg focus:outline-none"
                    style={{ backgroundColor: scrolledDown ? `${hexToRgba("#166534", 1)}` : `${hexToRgba("#166534", 0.8)}` }}
                >
                    <div className="flex flex-col items-center justify-start p-2">
                        <Menu.Item>
                            {({ active }) => (
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Popover className="relative">
                                        <Popover.Button className={linkStyles + ((router.pathname.includes("theatre") ? "active-link" : "")) + " text-offWhite !no-underline"}>
                                            Design
                                        </Popover.Button>

                                        <Popover.Panel className="absolute z-20 ml-[5.4rem] flex flex-col items-center justify-start p-2"
                                            style={{ backgroundColor: scrolledDown ? `${hexToRgba("#115e59", 1)}` : `${hexToRgba("#115e59", 0.8)}` }}>
                                            <Link className={linkStyles +
                                                ((router.pathname.includes("theatre") ? "active-link" : "")) +
                                                " text-offWhite !no-underline"} href="/portfolio/design/theatre"
                                            >
                                                Theatre
                                            </Link>
                                            <Link className={linkStyles + " text-offWhite !no-underline"} href="/portfolio/design/dance">
                                                Dance
                                            </Link>
                                            <Link className={linkStyles + " text-offWhite !no-underline"} href="/portfolio/design/installations">
                                                Installations
                                            </Link>
                                            <Link className={linkStyles + " text-offWhite !no-underline"} href="/portfolio/design/film">
                                                Film
                                            </Link>
                                        </Popover.Panel>
                                    </Popover>
                                </Transition>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles + " text-offWhite !no-underline"} href="/portfolio/drafting">
                                    Drafting
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles + " text-offWhite !no-underline"} href="/portfolio/visualization">
                                    Visualization
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles + " text-offWhite !no-underline"} href="/portfolio/programming">
                                    Programming
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}