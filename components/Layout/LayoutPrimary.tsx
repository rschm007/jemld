import { IDefaultPropsWithChildrenRequired } from "@/@types/DefaultProps";
import { Header } from "./Header";

export const LayoutPrimary = ({
    className = "",
    id,
    children
}: IDefaultPropsWithChildrenRequired) => {

    return (
        <div className={"w-full h-full bg-offWhite " + className} id={id}>
            <Header />
            {children}
        </div>
    )
}