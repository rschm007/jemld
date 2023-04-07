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
    const [onePanels, setOnePanels] = useState([]);
    const [twoPanels, setTwoPanels] = useState([]);

    // grab first images from each design category for our panel images
    useLayoutEffect(() => {
        const panels = getImagePanelsFromMetaData(imagesMeta, "drafting");

        const _onePanels = panels.filter((p) => p.subCategory === "scenicDesign");
        const _twoPanels = panels.filter((p) => p.subCategory === "lightingDesign");

        setOnePanels(_onePanels);
        setTwoPanels(_twoPanels);

        console.log(_onePanels)
    }, [])

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 min-h-screen">

                        <BannerHeader text="Drafting" />

                        <div className="md:grid md:grid-cols-4 gap-x-2">
                            {onePanels.length > 0 && (
                                <PanelImage
                                    src={onePanels[0].url}
                                    alt={onePanels[0].title}
                                    title={onePanels[0].title}
                                    href={`${onePanels[0].pageSlug.split("/")[1]}` + `/${onePanels[0].subCategory}`}
                                    titleClasses="!text-xl !md:text-3xl"
                                />
                            )}

                            {twoPanels.length > 1 && (
                                <PanelImage
                                    src={twoPanels[0].url}
                                    alt={twoPanels[0].title}
                                    title={twoPanels[0].title}
                                    href={`${twoPanels[0].pageSlug.split("/")[1]}` + `/${twoPanels[0].subCategory}`}
                                    titleClasses="!text-xl !md:text-3xl"
                                />
                            )}
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