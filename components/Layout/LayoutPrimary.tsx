import { IDefaultPropsWithChildrenRequired } from "@/@types/DefaultProps";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const LayoutPrimary = ({
    className = "",
    id,
    children
}: IDefaultPropsWithChildrenRequired) => {

    return (
        <div className={"flex flex-col w-full h-full justify-between bg-offWhite " + className} id={id}>
            <Header />

            {children}

            <Footer />
        </div>
    )
}