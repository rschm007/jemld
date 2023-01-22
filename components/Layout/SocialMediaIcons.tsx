import { IDefaultProps } from "@/@types"
import { SocialMedia, Socials } from "@/@types/SocialMedia"
import { getContent, getSocialMedia } from "@/database";
import { useEffect } from "react";
import { useState } from "react"

export const SocialMediaIcons = ({
    className = "",
    id
}: IDefaultProps) => {
    const [socials, setSocials] = useState<Array<any>>([]);

    useEffect(() => {
        getSocialMedia()
            .then((res) => {
                setSocials(res)
            })
    }, [])

    const setIconClass = (platform: Socials) => {
        let iconClass;

        switch (platform) {
            case "instagram":
                iconClass = "fa-instagram";
                break;
            case "facebook":
                "fafacebook-f";
                break;
            case "linkedIn":
                "fa-linkedin-in";
                break;
            case "twitter":
                "fa-twitter";
                break;
        }

        console.log(iconClass)

        return iconClass;
    }

    return (
        <div className={"flex flex-row items-center space-x-1 " + className} id={id}>
            {
                socials.map((s, i) => (
                    <a key={i} href={s.socialUrl}>
                        <i className={`fa-brands ${setIconClass(s.platform)}`}></i>
                    </a>
                ))
            }
        </div>
    )
}