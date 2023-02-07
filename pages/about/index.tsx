import { ContactForm, LayoutPrimary } from "@/components";
import { getAboutImageUrl, getContentBySchemaName, getMainImageURLs, mapImagesMetaData } from "@/database";
import { theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useState } from "react";
import { useHydrateAtoms } from 'jotai/utils'
import { BannerImage } from "@/components/Images/BannerImage";
import BannerHeader from "@/components/Layout/BannerHeader";

interface PropType {
    contentData: any;
    imageUrlData: any;
}

export const AboutPage = ({
    contentData,
    imageUrlData
}: PropType) => {
    const [content] = useState(contentData);
    const [image] = useState(imageUrlData);

    console.log(content);
    console.log(imageUrlData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">

                        <BannerHeader text="About Jacqueline" />

                        <div className="w-full h-full flex flex-col md:flex-row justify-center px-8 md:px-12 space-x-4">
                            <img className="w-full h-full md:h-[40rem] object-contain" src={image} />

                            <article className="w-full md:w-3/4 md:pr-28 py-10 md:py-4 text-left font-montserrat space-y-8" dangerouslySetInnerHTML={{ __html: content[0].bio }} />
                        </div>

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const contentData = await getContentBySchemaName("about");
    const imageUrlData = await getAboutImageUrl();

    return {
        props: {
            contentData: contentData,
            imageUrlData: imageUrlData
        }
    }
}

export default AboutPage;