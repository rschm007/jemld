import { AttributionBlock, BannerHeader, LayoutPrimary } from "@/components";
import { GalleryImage, HeroImage } from "@/components/Images";
import { getContentBySchemaName, getPageContent } from "@/database";

interface PropType {
    pageContentData: any;
}

export const TheatreDocPage = ({
    pageContentData,
}: PropType) => {
    console.log(pageContentData)

    const urls = pageContentData.urls;
    const title = pageContentData.data.title;
    const clientName = pageContentData.data.clientName;
    const year = pageContentData.data.year.toString();
    const longItemDescription = pageContentData.data.longItemDescription;
    const shortItemDescription = pageContentData.data.shortItemDescription;

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48">
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
    const pageContentData = await getPageContent(contentData, id);

    return {
        props: {
            pageContentData: pageContentData
        }
    }
}

export default TheatreDocPage;