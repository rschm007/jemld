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
                            <figure className="contact-slider w-full h-full hidden md:block">
                                <AutoplaySlider
                                    name="contact-slider"
                                    bullets
                                    organicArrows={false}
                                    play={true}
                                    cancelOnInteraction={false}
                                    interval={3000}
                                    infinite
                                    style={{
                                        background: "#000"
                                    }}
                                >
                                    {imagesMeta.map((img, i) => (
                                        <div data-src={img.url} key={i} />
                                    ))}
                                </AutoplaySlider>
                            </figure>

                            <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
                                <h1 className="text-4xl font-bold">
                                    Get in Touch
                                </h1>

                                <div className="flex flex-col items-center justify-start">
                                    <a className="underline text-blue-600" href="mailto:jemld@jemld.com">
                                        jemlightdesign@gmail.com
                                    </a>
                                </div>

                                <ContactForm className="w-full" />
                            </div>


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