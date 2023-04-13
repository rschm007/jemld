import { AttributionBlock, BannerHeader, LayoutPrimary, NextPrevDynamicPageButtons } from "@/components";
import { getContentBySchemaName, getMainImageURLs, getPageContent } from "@/database";
import { getFiles } from "@/database/media/files";
import { danceContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { atomWithStorage, useHydrateAtoms } from 'jotai/utils';
import DynamicWrapper from "@/components/SSR/DynamicWrapper";

const neighborPagesImagesAtom = atomWithStorage('portfolio-design_dance-neighbors', [])

interface PropType {
    filesData: any;
    contentData: any;
    pageContentData: any;
}

export const DanceDocPage = ({
    filesData,
    contentData,
    pageContentData,
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [danceContentAtom, contentData]
    ])
    const [content] = useAtom(danceContentAtom);
    const [neighborPagesImages, setNeighborPagesImages] = useAtom(neighborPagesImagesAtom);

    useEffect(() => {
        if (neighborPagesImages.length === 0) {
            getMainImageURLs(contentData)
                .then(async (res) => {
                    setNeighborPagesImages([...res]);
                });
        }
    }, [])

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    // variables for attribution block injection
    const urls = pageContentData.urls;
    const title = pageContentData.data.title;
    const clientName = pageContentData.data.clientName;
    const year = pageContentData.data.year.toString();
    const longItemDescription = pageContentData.data.longItemDescription;
    // variables for next/prev buttons
    const thisPageIndex = content.findIndex((c) => c.id === pageContentData.data.id);
    const prevPageId = content[thisPageIndex - 1]?.id || null;
    const prevPageImgUrl = neighborPagesImages[thisPageIndex - 1];
    const nextPageId = content[thisPageIndex + 1]?.id || null;
    const nextPageImgUrl = neighborPagesImages[thisPageIndex + 1];
    const prevPageTitle = content[thisPageIndex - 1]?.title || null;
    const nextPageTitle = content[thisPageIndex + 1]?.title || null;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 overflow-x-auto">

                        <BannerHeader text={title} />

                        <DynamicWrapper>
                            <NextPrevDynamicPageButtons
                                pageSlug="/portfolio/design/dance"
                                nextItemId={nextPageId}
                                nextItemTitle={nextPageTitle}
                                nextItemImgUrl={nextPageImgUrl}
                                nextItemDisabled={nextPageId === null || undefined}
                                prevItemId={prevPageId}
                                prevItemTitle={prevPageTitle}
                                prevItemImgUrl={prevPageImgUrl}
                                prevItemDisabled={prevPageId === null || undefined}
                            >

                            </NextPrevDynamicPageButtons>
                        </DynamicWrapper>

                        <div className="flex flex-col md:flex-row items-center w-full">

                            <AttributionBlock
                                clientName={clientName}
                                year={year}
                                longItemDescription={longItemDescription}
                            />

                            <AutoplaySlider
                                name={`${title}-slider`}
                                bullets
                                organicArrows={true}
                                play
                                cancelOnInteraction={true}
                                infinite
                                mobileTouch
                            >
                                {urls[0].map((url, i) => (
                                    <div data-src={url} key={i} />
                                ))}
                            </AutoplaySlider>
                        </div>

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context.query.id;

    const contentData = await getContentBySchemaName("dance");
    const filesData = await getFiles();
    const pageContentData = await getPageContent(contentData, id);

    return {
        props: {
            contentData: contentData,
            pageContentData: pageContentData,
            filesData: filesData
        }
    }
}

export default DanceDocPage;