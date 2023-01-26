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
        <div className={"flex flex-col items-center justify-center space-y-1 " + className} id={id}>
            <p className="text-sm">
                {label}
            </p>

            <span className="text-xl font-montserraFt">
                {content}
            </span>
        </div>
    )
}