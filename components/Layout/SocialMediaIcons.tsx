import { IDefaultProps } from "@/@types"
import { SocialMedia } from "@/@types/SocialMedia"
import { useEffect } from "react";
import { useState } from "react"

export const SocialMediaIcons = ({
    className = "",
    id
}: IDefaultProps) => {
    const [socials, getSocials] = useState<Array<any>>([]);

    return (
        <div className={"flex flex-row items-center space-x-1 " + className} id={id}>

        </div>
    )
}