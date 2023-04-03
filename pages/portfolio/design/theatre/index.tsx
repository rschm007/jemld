import { LayoutPrimary } from "@/components";
import { getContentBySchemaName, getMainImageURLs, mapImagesMetaData } from "@/database";
import { theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useState } from "react";
import { useHydrateAtoms } from 'jotai/utils'
import { BannerImage } from "@/components/Images/BannerImage";
import BannerHeader from "@/components/Layout/BannerHeader";
import { PanelImage } from "@/components/Images/PanelImage";
import { getRelevantPageSlug } from "@/utils";

interface PropType {
    contentData: any;
    imagesMetaData: any;
}

export const TheatrePage = ({
    contentData,
    imagesMetaData
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [theatreContentAtom, contentData]
    ])
    const [content] = useAtom(theatreContentAtom);
    const [imagesMeta] = useState(imagesMetaData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48">

                        <BannerHeader text="Theatre" />

                        <div className="md:grid md:grid-cols-4 gap-x-2 min-h-screen">
                            {imagesMeta.sort((a, b) => a.orderNo - b.orderNo).map((img, i) => (
                                <PanelImage
                                    key={i}
                                    src={img.url}
                                    alt={img.title}
                                    title={img.title}
                                    href={img.pageSlug}
                                    titleClasses="!text-xl !md:text-3xl"
                                />
                            ))}
                        </div>
                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const contentData = await getContentBySchemaName("theatre");
    const imageUrlsData = await getMainImageURLs(contentData);
    const imagesMetaData = await mapImagesMetaData(contentData, imageUrlsData);

    return {
        props: {
            contentData: contentData,
            imagesMetaData: imagesMetaData
        }
    }
}

export default TheatrePage;