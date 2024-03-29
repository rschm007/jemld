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
    const [content, setContent] = useAtom(danceContentAtom);
    const [neighborPagesImages, setNeighborPagesImages] = useAtom(neighborPagesImagesAtom);

    useEffect(() => {
        if (neighborPagesImages.length === 0) {
            getMainImageURLs(contentData)
                .then(async (res) => {
                    setNeighborPagesImages([...res]);
                });
        }
    }, [])

    useEffect(() => {
        if (content != contentData) {
            setContent(contentData);
        }
    }, [contentData])

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    // variables for attribution block injection
    const urls = pageContentData.urls;
    const title = pageContentData.data.title;
    const clientName = pageContentData.data.clientName;
    const year = pageContentData.data.year.toString();
    const longDescription = pageContentData.data.longDescription;
    const longItemDescription = pageContentData.data.longItemDescription;
    // variables for next/prev buttons
    const thisPageIndex = content.findIndex((c) => c.id === pageContentData.data.id);
    const prevPageId = content[thisPageIndex - 1]?.id || null;
    const prevPageImgUrl = `/images/dance/${content[thisPageIndex - 1]}`;
    const nextPageId = content[thisPageIndex + 1]?.id || null;
    const nextPageImgUrl = neighborPagesImages[thisPageIndex + 1];
    const prevPageTitle = content[thisPageIndex - 1]?.title || null;
    const nextPageTitle = content[thisPageIndex + 1]?.title || null;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="overflow-x-auto">

                        <DynamicWrapper>
                            <NextPrevDynamicPageButtons
                                pageSlug="/portfolio/design/dance"
                                nextItemId={nextPageId}
                                nextItemDisabled={nextPageId === null || undefined}
                                prevItemId={prevPageId}
                                prevItemDisabled={prevPageId === null || undefined}
                            >

                            </NextPrevDynamicPageButtons>
                        </DynamicWrapper>

                        <div className="flex flex-col md:flex-row items-center w-full md:mt-[17rem]">

                            <AttributionBlock
                                title={title}
                                clientName={clientName}
                                year={year}
                                shortItemDescription={longDescription}
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
                                {(urls != null || undefined) && (urls.length != 0) && urls.map((url, i) => (
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

    contentData.sort((a, b) => {
        if (a.orderNo < b.orderNo) {
            return -1;
        }
        if (a.orderNo > b.orderNo) {
            return 1;
        }
        // a must be equal to b
        return 0;
    });

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