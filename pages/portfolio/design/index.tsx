import Head from 'next/head'
import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent, getImagePanelsFromMetaData, getMainImageURLs, mapImagesMetaData } from '@/database';
import { designImagesAtom, homeImagesAtom } from '@/state';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils'
import { PanelImage } from '@/components/Images/PanelImage';
import { useLayoutEffect, useState } from 'react';
import { getRelevantPageSlug } from '@/utils';

interface PropType {
    contentData: any;
    imagesMetaData: any;
}

export const Design = ({
    contentData,
    imagesMetaData
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [designImagesAtom, imagesMetaData]
    ])
    const [imagesMeta] = useAtom(designImagesAtom);
    const [panels, setPanels] = useState([]);

    console.log(contentData);
    console.log(imagesMetaData);

    // grab first images from each design category for our panel images
    useLayoutEffect(() => {
        if (imagesMeta.length === 0) {
            const panels = getImagePanelsFromMetaData(imagesMetaData, "design");

            setPanels(panels)
        }
    }, [])

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 min-h-screen">

                        <BannerHeader text="Design" />

                        <div className="md:grid md:grid-cols-4 gap-x-2">
                            {panels.map((img, i) => (
                                <PanelImage
                                    key={i}
                                    src={img.url}
                                    alt={img.title}
                                    title={getRelevantPageSlug(img.pageSlug)}
                                    href={`design/${getRelevantPageSlug(img.pageSlug)}`}
                                />
                            ))}
                        </div>

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const contentData = await getContent();
    const imageUrlsData = await getMainImageURLs(contentData);
    const imagesMetaData = await mapImagesMetaData(contentData, imageUrlsData);

    return {
        props: {
            contentData: contentData,
            imagesMetaData: imagesMetaData
        }
    }
}

export default Design;