import { LayoutPrimary } from "@/components";
import { getContentBySchemaName, getMainImageURLs, mapImagesMetaData } from "@/database";
import { theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { useHydrateAtoms } from 'jotai/utils'
import { BannerImage } from "@/components/Layout/BannerImage";

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

    console.log(imagesMeta)

    const router = useRouter();
    const id = router.query.id;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">
                        {imagesMeta.sort((a, b) => a.orderNo - b.orderNo).map((img, i) => (
                            <BannerImage
                                key={i}
                                src={img.url}
                                alt={img.title}
                                title={img.title}
                                href={img.pageSlug}
                            />
                        ))}
                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const id = query;

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