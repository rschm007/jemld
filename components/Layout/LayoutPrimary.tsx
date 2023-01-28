import { IDefaultPropsWithChildrenRequired } from "@/@types/DefaultProps";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LayoutPrimary = ({
    className = "",
    id,
    children
}: IDefaultPropsWithChildrenRequired) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => {
            setMounted(false);
        }
    })

    return (
        <div>
            <Header />

            <motion.div
                className={"flex flex-col w-full h-full justify-between bg-offWhite overflow-x-auto overflow-y-auto " + className}
                id={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 2
                }}
            >

                {children}

            </motion.div>

            <Footer />

        </div>

    )
}