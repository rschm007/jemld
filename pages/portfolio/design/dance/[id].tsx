import { AttributionBlock, BannerHeader, LayoutPrimary } from "@/components";
import { getContentBySchemaName, getPageContent } from "@/database";
import { getFiles } from "@/database/media/files";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

interface PropType {
    filesData: any;
    pageContentData: any;
}

export const TheatreDocPage = ({
    filesData,
    pageContentData,
}: PropType) => {

    const AutoplaySlider = withAutoplay(AwesomeSlider);


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

                    <section className="flex flex-col mt-48">

                        <BannerHeader text={title} />

                        <AttributionBlock
                            clientName={clientName}
                            year={year}
                            longItemDescription={longItemDescription}
                        />

                        <section className="space-y-2">
                            <AutoplaySlider
                                name={`${title}-slider`}
                                bullets
                                organicArrows={false}
                                play
                                cancelOnInteraction
                                interval={6000}
                            >
                                {urls[0].map((url, i) => (
                                    <div data-src={url} key={i} />
                                ))}
                            </AutoplaySlider>
                        </section>


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
            pageContentData: pageContentData,
            filesData: filesData
        }
    }
}

export default TheatreDocPage;