import { AttributionBlock, BannerHeader, LayoutPrimary } from "@/components";
import { NextPrevDynamicPageButtons } from "@/components/GUI/NextPrevDynamicPageButtons";
import { getContentBySchemaName, getMainImageURLs, getPageContent } from "@/database";
import { filmContentAtom, theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils';
import { atomWithStorage } from "jotai/vanilla/utils";
import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const neighborPagesImagesAtom = atomWithStorage<Array<any>>('portfolio-design_film-neighbors', []);

interface PropType {
    contentData: any;
    pageContentData: any;
}

export const TheatreDocPage = ({
    contentData,
    pageContentData,
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [filmContentAtom, contentData]
    ])
    const [content] = useAtom(filmContentAtom);
    // @ts-ignore
    const [neighborPagesImages, setNeighborPagesImages] = useAtom<Array<any>>(neighborPagesImagesAtom);

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

                        <NextPrevDynamicPageButtons
                            pageSlug="/portfolio/design/film"
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

                        <div className="flex flex-col md:flex-row items-center w-full">

                            <AttributionBlock
                                title={title}
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

    const contentData = await getContentBySchemaName("film");
    const pageContentData = await getPageContent(contentData, id);

    return {
        props: {
            contentData: contentData,
            pageContentData: pageContentData
        }
    }
}

export default TheatreDocPage;