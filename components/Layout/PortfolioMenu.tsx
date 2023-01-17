import { DefaultProps } from "@/@types"
import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import { Fragment } from "react"
import { linkStyles } from "./Nav"

export const PortfolioMenu = ({
    className = "",
    id
}: DefaultProps) => {

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
                <Menu.Items className="flex flex-col absolute !mr-[11rem] mt-[6rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex flex-col items-center justify-start p-2">
                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles} href="/theatre">
                                    Theatre
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles} href="/dance">
                                    Dance
                                </Link>
                            )}
                        </Menu.Item>

                        <Menu.Item>
                            {({ active }) => (
                                <Link className={linkStyles} href="/cadDesign">
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