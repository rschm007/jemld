import { LayoutPrimary } from "@/components";
import { getAboutImageUrl, getContentBySchemaName } from "@/database";
import { useState } from "react";
import BannerHeader from "@/components/Layout/BannerHeader";

interface PropType {
    contentData: any;
    imageUrlData: any;
}

export const ResumePage = ({
    contentData,
    imageUrlData
}: PropType) => {
    const [content] = useState(contentData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">

                        <BannerHeader text="Resume" />

                        <div className="w-full h-full flex flex-col md:flex-row justify-center px-8 md:px-12 space-x-4">
                            <article className="w-full md:w-3/4 md:pr-28 py-10 md:py-4 text-left font-montserrat space-y-8" dangerouslySetInnerHTML={{ __html: content[0].bio }} />
                        </div>

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const contentData = await getContentBySchemaName("resume");

    return {
        props: {
            contentData: contentData
        }
    }
}

export default ResumePage;