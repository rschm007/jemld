import { IDefaultProps } from "@/@types"
import { AttributionContentLabel } from "./AttributionContentLabel";
import { useState, useEffect } from "react";

export interface AttributionBlockProps extends IDefaultProps {
    title: string;
    clientName?: string;
    year?: string;
    longItemDescription?: string;
    shortItemDescription?: string;
}

export const AttributionBlock = ({
    className = "",
    id,
    title,
    clientName,
    year,
    longItemDescription,
    shortItemDescription
}: AttributionBlockProps) => {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', isHidden);

        return () => {
            window.removeEventListener('scroll', isHidden);
        };
    }, []);

    /* Method that will fix header after a specific scrollable */
    const isHidden = (e) => {
        const scrollTop = window.scrollY;

        if (scrollTop >= 175) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    };


    return (
        <article className={"flex flex-col items-start justify-center w-full space-y-4 mt-3 mb-16 lg:ml-16 xl:ml-20 mr-12 self-center" + className} id={id}>

            <div className="flex flex-col items-start justify-start">
                {(title != null || "") && (
                    <h2 className={"text-left text-[2.5rem] mb-2 opacity-100 transition-all ease-in-out duration-300 " + (hidden ? "!opacity-0" : "")}>
                        {title}
                    </h2>
                )}

                {(clientName != null || "") && (
                    <AttributionContentLabel
                        label="Client"
                        content={clientName}
                    />
                )}

                {(year != null || undefined) && (
                    <AttributionContentLabel
                        label="Year"
                        content={year}
                    />
                )}
            </div>

            {(shortItemDescription != null || "") && (
                <div className="text-left text-xs" dangerouslySetInnerHTML={{ __html: shortItemDescription }}>
                </div>
            )
            }

            {(longItemDescription != null || "") && (
                <div className="text-left text-xs" dangerouslySetInnerHTML={{ __html: longItemDescription }}>
                </div>
            )
            }

        </article >
    )
}