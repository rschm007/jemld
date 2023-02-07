import { ContactForm, LayoutPrimary } from "@/components";
import { getContent, getMainImageURLs, mapImagesMetaData } from "@/database";
import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

interface PropType {
    imagesMetaData: any;
}

export const ContactPage = ({
    imagesMetaData
}: PropType) => {
    const [imagesMeta] = useState(imagesMetaData);

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">

                        <div className="mb-12 md:my-24 px-8 md:px-32 w-full h-full flex flex-col-reverse md:flex-row items-center justify-center md:space-y-8">
                            <figure className="w-full h-full hidden md:block">
                                <AutoplaySlider
                                    name="contact-slider"
                                    bullets
                                    organicArrows={false}
                                    play
                                    cancelOnInteraction
                                    interval={3000}
                                    style={{
                                        maxWidth: "45rem",
                                        background: "#000"
                                    }}
                                >
                                    {imagesMeta.map((img) => (
                                        <div data-src={img.url} />
                                    ))}
                                </AutoplaySlider>
                            </figure>

                            <ContactForm className="w-full md:w-2/3" />
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
            imagesMetaData: imagesMetaData
        }
    }
}

export default ContactPage;