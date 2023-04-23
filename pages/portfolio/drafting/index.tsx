import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent, getContentBySchemaName } from '@/database';
import { PanelImage } from '@/components/Images/PanelImage';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

interface PropType {
    lightingPanelData: any;
    scenicPanelData: any;
    imagesData: any;
}

export const Drafting = ({
    lightingPanelData,
    scenicPanelData,
    imagesData
}: PropType) => {
    const [lightingPanel, setLightingPanel] = useState(lightingPanelData);
    const [scenicPanel, setScenicPanel] = useState(scenicPanelData);
    const [images, setImages] = useState(imagesData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 min-h-screen">

                        <BannerHeader text="Drafting" />

                        <div className="md:grid md:grid-cols-4 gap-x-2">
                            {lightingPanel && (
                                <PanelImage
                                    src={images[0]}
                                    alt={lightingPanel.altText}
                                    title="Dance"
                                    href="drafting/lightingDesign"
                                />
                            )}

                            {scenicPanel && (
                                <PanelImage
                                    src={images[1]}
                                    alt={scenicPanel.altText}
                                    title="Theatre"
                                    href="drafting/scenicDesign"
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
    const contentData = await getContentBySchemaName("drafting");
    const lightingContentData = [];
    const scenicContentData = [];

    contentData.forEach((x) => {
        if (x.subCategory === "lightingDesign") {
            lightingContentData.push(x);
        } else if (x.subCategory === "scenicDesign") {
            scenicContentData.push(x);
        }
    })

    const imageNames = [];

    let lightingPanelData = null;
    await lightingContentData.filter(async (d) => {
        await d?.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainCatImage')) {
                lightingPanelData = x;
                imageNames.push(x.title)
            }
        });
    })

    let scenicPanelData = null;
    await scenicContentData.filter(async (d) => {
        await d?.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainCatImage')) {
                scenicPanelData = x;
                imageNames.push(x.title)
            }
        });
    })

    let images = [];
    await imageNames.forEach((x) => {
        const storage = getStorage();
        const imageRef = ref(storage, `flamelink/media/${x}`)
        const url = getDownloadURL(imageRef).then((res) => {
            if (res) {
                return res;
            }
        }).catch((error) => {
            console.error(error);
            return null;
        });
        images.push(url);
    })

    const imagesData = await Promise.all(images);

    return {
        props: {
            lightingPanelData: lightingPanelData,
            scenicPanelData: scenicPanelData,
            imagesData: imagesData
        }
    }
}

export default Drafting;