import { LayoutPrimary } from "@/components";
import { getContentBySchemaName, getMainImageURLs, mapImagesMetaData } from "@/database";
import { danceContentAtom, theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { useHydrateAtoms } from 'jotai/utils'
import { BannerImage } from "@/components/Images/BannerImage";
import BannerHeader from "@/components/Layout/BannerHeader";
import { PanelImage } from "@/components/Images/PanelImage";

interface PropType {
    contentData: any;
    imageUrlsData: any;
    imagesMetaData: any;
}

export const TheatrePage = ({
    contentData,
    imageUrlsData,
    imagesMetaData
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [danceContentAtom, contentData]
    ])
    const [content] = useAtom(danceContentAtom);
    const [imagesMeta] = useState(imagesMetaData);

    console.log(contentData)
    console.log(imageUrlsData);
    console.log(imagesMeta)

    const router = useRouter();
    const id = router.query.id;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48">

                        <BannerHeader text="Dance" />

                        <div className="md:grid md:grid-cols-4 gap-x-2 min-h-screen">
                            {imagesMeta.sort((a, b) => a.orderNo - b.orderNo).map((img, i) => (
                                <PanelImage
                                    key={i}
                                    src={img.url}
                                    alt={img.title}
                                    title={img.title}
                                    href={`${img.pageSlug}`}
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
    const id = query;

    const contentData = await getContentBySchemaName("dance");
    const imageUrlsData = await getMainImageURLs(contentData);
    const imagesMetaData = await mapImagesMetaData(contentData, imageUrlsData);

    return {
        props: {
            contentData: contentData,
            imageUrlsData: imageUrlsData,
            imagesMetaData: imagesMetaData
        }
    }
}

export default TheatrePage;