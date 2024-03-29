import { BannerHeader, LayoutPrimary } from "@/components";
import { getContent, getProcessPageContent } from "@/database";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";

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
                                        <Link
                                            href={url}
                                            key={url}
                                            className="flex flex-row w-full items-center justify-center">
                                            <Image
                                                className="object-cover w-7/12 h-full object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray "
                                                src={url}
                                                alt={pageContentData.data.title}
                                                width={250}
                                                height={500}
                                                unoptimized
                                                loading="lazy"
                                            />
                                        </Link>
                                    )}

                                    {url.includes("pdf") && (
                                        <object
                                            key={url}
                                            className="object-cover w-9/12 h-full min-h-[90vh] object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray !mb-12"
                                            data={`${url}#toolbar=1&navpanes=0`}
                                            type="application/pdf"
                                            width="100%"
                                            height="100%"
                                        />

                                    )}

                                    {url.includes("mp4") && (
                                        <video
                                            key={url}
                                            className="object-cover w-9/12 h-full min-h-[90vh] object-bottom relative brightness-100 group-hover:brightness-[0.25] transition-all ease-in-out delay-75 z-0 bg-darkGray mb-12" width="750" height="500" controls >
                                            <source src={url} type="video/mp4" />
                                        </video>
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