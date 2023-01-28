import { AttributionBlock, BannerHeader, LayoutPrimary } from "@/components";
import { GalleryImage, HeroImage } from "@/components/Images";
import { NextPrevDynamicPageButtons } from "@/components/Layout/NextPrevDynamicPageButtons";
import { getContentBySchemaName, getMainImageURLs, getPageContent } from "@/database";
import { theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils';

interface PropType {
    contentData: any;
    neighborPagesImagesData: any;
    pageContentData: any;
}

export const TheatreDocPage = ({
    contentData,
    neighborPagesImagesData,
    pageContentData,
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [theatreContentAtom, contentData]
    ])
    const [content] = useAtom(theatreContentAtom);

    console.log(content);
    console.log(pageContentData);

    // variables for attribution block injection
    const urls = pageContentData.urls;
    const title = pageContentData.data.title;
    const clientName = pageContentData.data.clientName;
    const year = pageContentData.data.year.toString();
    const longItemDescription = pageContentData.data.longItemDescription;
    // variables for next/prev buttons
    const thisPageIndex = content.findIndex((c) => c.id === pageContentData.data.id);
    const prevPageId = content[thisPageIndex - 1].id;
    const prevPageImgUrl = neighborPagesImagesData[thisPageIndex - 1];
    const nextPageId = content[thisPageIndex + 1].id;
    const nextPageImgUrl = neighborPagesImagesData[thisPageIndex + 1];
    const prevPageTitle = content[thisPageIndex - 1].title;
    const nextPageTitle = content[thisPageIndex + 1].title;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <NextPrevDynamicPageButtons
                        pageSlug="/portfolio/theatre/"
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

                    <section className="mt-48 overflow-x-auto">
                        <HeroImage src={urls[0][0]} alt={title} />

                        <BannerHeader text={title} />

                        <AttributionBlock
                            clientName={clientName}
                            year={year}
                            longItemDescription={longItemDescription}
                        />

                        <section className="space-y-2">
                            {urls[0].map((url, i) => (
                                <GalleryImage
                                    key={i}
                                    src={url}
                                    alt={title}
                                />
                            ))}
                        </section>


                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context.query.id;

    const contentData = await getContentBySchemaName("theatre");
    const neighborPagesImagesData = await getMainImageURLs(contentData);
    const pageContentData = await getPageContent(contentData, id);

    return {
        props: {
            contentData: contentData,
            neighborPagesImagesData: neighborPagesImagesData,
            pageContentData: pageContentData
        }
    }
}

export default TheatreDocPage;