import { IDefaultProps } from "@/@types";

export interface AttributionContentLabelProps extends IDefaultProps {
    content: string;
    label: string;
}

export const AttributionContentLabel = ({
    className = "",
    id,
    content,
    label
}: AttributionContentLabelProps) => {

    return (
        <div className={"flex flex-col items-start justify-between space-y-1 " + className} id={id}>
            <p className="text-sm font-montserrat font-medium">
                {label}
            </p>

            <span className="text-xl font-montserrat font-semibold text-start">
                {content}
            </span>
        </div>
    )
}