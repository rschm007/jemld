import { BannerHeader, LayoutPrimary } from "@/components";
import { getContent, getProcessPageContent } from "@/database";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import PDF from "@/components/Files/PDF";

interface PropType {
    contentData: any;
    pageContentData: any;
}

export const ProcessDocPage = ({
    contentData,
    pageContentData,
}: PropType) => {
    const [content, setContent] = useState(contentData);

    useEffect(() => {
        if (content != contentData) {
            setContent(contentData);
        }
    }, [contentData])


    const title = pageContentData.data.title;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 overflow-x-auto">

                        <BannerHeader text={title} />

                        <div className="flex flex-col items-center w-full space-y-6">

                            {pageContentData.urls.map((url, i) => (
                                <>
                                    {url.includes("png" || "webp" || "jpg" || "jpeg") && (
                                        <Link href={url} key={i} className="flex flex-row w-full items-center justify-center">
                                            <Image
                                                className="object-cover w-7/12 h-full object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray "
                                                src={url}
                                                alt={pageContentData.data.title}
                                                width={250}
                                                height={500}
                                                unoptimized
                                                loading="lazy"
                                            /></Link>


                                    )}

                                    {url.includes("pdf") && (
                                        <object
                                            className="object-cover w-9/12 h-full min-h-[70vh] object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray"
                                            data={url}
                                            type="application/pdf"
                                            width="100%"
                                            height="100%"
                                        />

                                    )}
                                </>
                            ))
                            }
                        </div>

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context.query.id;

    const contentData = await getContent();
    const pageContentData = await getProcessPageContent(contentData, id);

    return {
        props: {
            contentData: contentData,
            pageContentData: pageContentData
        }
    }
}

export default ProcessDocPage;