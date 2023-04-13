import { IDefaultPropsWithChildren } from "@/@types";
import { motion } from "framer-motion";
import Link from "next/link";

export interface NextPrevDynamicPageButtonsProps extends IDefaultPropsWithChildren {
    pageSlug: string;
    nextItemId: string | null;
    nextItemTitle: string | null;
    nextItemImgUrl: string | null;
    nextItemDisabled: boolean;
    prevItemId: string | null;
    prevItemTitle: string | null;
    prevItemImgUrl: string | null;
    prevItemDisabled: boolean;
}

/**
 * @description side buttons for navigating to next or prev items in content item array
 */
export const NextPrevDynamicPageButtons = ({
    className = "",
    id,
    children,
    pageSlug,
    nextItemId,
    nextItemTitle,
    nextItemImgUrl,
    nextItemDisabled,
    prevItemId,
    prevItemTitle,
    prevItemImgUrl,
    prevItemDisabled,
}: NextPrevDynamicPageButtonsProps) => {

    return (
        <div className={"dynamic-buttons relative flex flex-col items-center justify-center w-full h-full z-50 pointer-events-none " + (!nextItemDisabled || !prevItemDisabled ? "my-12 md:-mt-28 md:mb-12 " : "")}>

            {children}

            <div className={"flex flex-row relative z-0 items-center w-full justify-between " + (prevItemDisabled ? "!justify-end " : "") + (nextItemDisabled ? "!justify-start " : "")}>

                {!prevItemDisabled && (
                    <Link
                        className="group flex flex-row items-center justify-center bg-[rgba(0,0,0,0.3)] opacity-80 w-12 h-24 rounded-r-lg z-50 transition-all duration-300 ease-in-out hover:w-80 hover:bg-[rgba(0,0,0,0.8)] pointer-events-auto"
                        href={`${pageSlug}/${prevItemId}`}
                    >
                        <span className="absolute left-3">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 384 512">
                                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                            </svg>
                        </span>

                        <div className="flex-row items-center justify-between h-full w-full ml-4 pl-8 hidden group-hover:flex transition-all duration-300 ease-in-out space-x-6">
                            <div className="flex flex-col items-center max-w-[50%]">
                                <motion.p
                                    className="text-[11px] text-center text-[#fff] font-normal font-montserrat"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 500
                                    }}
                                >
                                    Previous Page
                                </motion.p>

                                <motion.p
                                    className="text-sm text-center text-[#fff] font-semibold font-montserrat max-w-[100%] truncate"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 500
                                    }}
                                >
                                    {prevItemTitle}
                                </motion.p>
                            </div>

                            <img src={prevItemImgUrl} className="w-36 h-full object-cover rounded-r-lg" alt={prevItemTitle} />
                        </div>
                    </Link>
                )}

                {!nextItemDisabled && (
                    <Link
                        className="group flex flex-row items-center justify-center bg-[rgba(0,0,0,0.3)] opacity-80 w-12 h-24 rounded-l-lg z-50 transition-all duration-300 ease-in-out hover:w-80 hover:bg-[rgba(0,0,0,0.8)] pointer-events-auto"
                        href={`${pageSlug}/${nextItemId}`}
                    >
                        <div className="flex-row items-center justify-between h-full w-full mr-4 pr-8 hidden group-hover:flex transition-all duration-300 ease-in-out space-x-6">

                            <img src={nextItemImgUrl} className="w-36 h-full object-cover rounded-l-lg" alt={nextItemTitle} />

                            <div className="flex flex-col items-center">
                                <motion.p
                                    className="text-[11px] text-center text-[#fff] font-normal font-montserrat truncate"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 500
                                    }}
                                >
                                    Next Page
                                </motion.p>

                                <motion.p
                                    className="text-sm text-center text-[#fff] font-semibold font-montserrat truncate"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 500
                                    }}
                                >
                                    {nextItemTitle}
                                </motion.p>
                            </div>
                        </div>

                        <span className="absolute right-3">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 320 512">
                                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z" />
                            </svg>
                        </span>
                    </Link>
                )}

            </div>

        </div>
    )
}