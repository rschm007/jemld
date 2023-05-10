import { IDefaultProps } from "@/@types";
import { useState } from "react";
import { Document, Page } from 'react-pdf';

export interface PDFProps extends IDefaultProps {
    src: string;
}

export default function PDF({
    className = "",
    id,
    src
}: PDFProps) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <figure className={className} id={id}>
            <Document file={src} onLoadSuccess={onDocumentLoadSuccess} pageMode="useNone" pageLayout="singlePage">
                <Page pageNumber={pageNumber} wrap={false} />
            </Document>
        </figure>

    )
}