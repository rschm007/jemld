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

    return (
        <article className={"flex flex-col items-start justify-center w-full space-y-4 mt-3 mb-16 lg:ml-16 xl:ml-20 mr-12 self-center" + className} id={id}>

            <div className="flex flex-col items-start justify-start">
                {(title != null || "") && (
                    <h2 className="text-left text-[2.5rem] mb-2">
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
                <div className="attribution text-left text-xs" dangerouslySetInnerHTML={{ __html: shortItemDescription }}>
                </div>
            )
            }

            {(longItemDescription != null || "") && (
                <div className="attribution text-left text-xs" dangerouslySetInnerHTML={{ __html: longItemDescription }}>
                </div>
            )
            }

        </article >
    )
}