import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent, getContentBySchemaName } from '@/database';
import { PanelImage } from '@/components/Images/PanelImage';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

interface PropType {
    pageContentData: any;
    panelsData: any;
}

export const LightingDesign = ({
    pageContentData,
    panelsData
}: PropType) => {
    const [content, setContent] = useState(pageContentData);
    const [panels, setPanels] = useState(panelsData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 min-h-screen">

                        <BannerHeader text="Lighting Design" />

                        <div className="md:grid md:grid-cols-4 gap-x-2">

                            {content && panels && (
                                content.map((c, i) => {

                                    if (panels[i] != null) {
                                        return (
                                            <PanelImage
                                                key={i}
                                                src={panels[i]}
                                                alt={c.title}
                                                title={c.title}
                                                href={"lightingDesign/" + c.id}
                                                titleClasses="!text-xl !md:text-3xl"
                                                loadingStrategy="lazy"
                                            />
                                        )
                                    }
                                })
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
    const scenicContentData = [];

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

    contentData.forEach((x) => {
        if (x.subCategory === "lightingDesign") {
            scenicContentData.push(x);
        }
    })

    const imageNames = [];
    const panels = [];
    const pageContentData = await contentData.filter(async (d) => {
        await d.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainImage')) {
                panels.push(x);
                imageNames.push(x.title)
            }
        });
    })

    const images = [];
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

    const panelsData = await Promise.all(images);

    return {
        props: {
            pageContentData: pageContentData,
            panelsData: panelsData
        }
    }
}

export default LightingDesign;