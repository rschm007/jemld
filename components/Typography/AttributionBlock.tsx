import { IDefaultProps } from "@/@types"
import { AttributionContentLabel } from "./AttributionContentLabel";

export interface AttributionBlockProps extends IDefaultProps {
    clientName?: string;
    year?: string;
    longItemDescription?: string;
    shortItemDescription?: string;
}

export const AttributionBlock = ({
    className = "",
    id,
    clientName,
    year,
    longItemDescription,
    shortItemDescription
}: AttributionBlockProps) => {

    return (
        <article className={"flex flex-col items-center justify-center w-full space-y-11 mt-3 mb-16 self-center px-80" + className} id={id}>

            <div className="flex flex-row items-center justify-center space-x-8">
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

            {(longItemDescription != null || "") && (
                <div className="text-center" dangerouslySetInnerHTML={{ __html: longItemDescription }}>
                </div>
            )
            }

        </article >
    )
}