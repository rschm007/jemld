import Head from 'next/head'
import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent, getImagePanelsFromMetaData, getMainImageURLs, mapImagesMetaData } from '@/database';
import { homeImagesAtom } from '@/state';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils'
import { PanelImage } from '@/components/Images/PanelImage';
import { useLayoutEffect, useState } from 'react';
import { getRelevantPageSlug } from '@/utils';

interface PropType {
    contentData: any;
    imagesMetaData: any;
}

export const Drafting = ({
    contentData,
    imagesMetaData
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [homeImagesAtom, imagesMetaData]
    ])
    const [imagesMeta] = useAtom(homeImagesAtom);
    const [panels, setPanels] = useState([]);

    // grab first images from each design category for our panel images
    useLayoutEffect(() => {
        const panels = getImagePanelsFromMetaData(imagesMeta, "drafting");

        const _panels = panels.filter((p) => p.subCategory === "lightingDesign");

        setPanels(_panels);

    }, [])

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 min-h-screen">

                        <BannerHeader text="Lighting Design Drafting" />

                        <div className="md:grid md:grid-cols-4 gap-x-2">
                            {panels.sort((a, b) => a.orderNo - b.orderNo).map((img, i) => {
                                const href = img.pageSlug.split("/");

                                return (
                                    <PanelImage
                                        key={i}
                                        src={img.url}
                                        alt={img.title}
                                        title={img.title}
                                        href={"lightingDesign/" + href[2]}
                                        titleClasses="!text-xl !md:text-3xl"
                                    />
                                )
                            })}

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

export default Drafting;