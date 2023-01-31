import React from "react";
import { IDefaultProps } from "../../@types";

export interface MenuHamburgerProps extends IDefaultProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element;
    color: "white" | "dark";
}

const MenuHamburger = ({
    className = "",
    id,
    onClick,
    color
}: MenuHamburgerProps) => {

    return (

        <button
            id={id}
            className={
                "mx-1 h-8 w-8 self-center transition duration-300 delay-75 " +
                className
            }
            onClick={onClick}
        >
            <svg
                className="h-9 w-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill={color === "white" ? "#fff" : "#404040"}>
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
        </button>

    );
};

export default MenuHamburger;