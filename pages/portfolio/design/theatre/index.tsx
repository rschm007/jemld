import { LayoutPrimary } from "@/components";
import { getContentBySchemaName } from "@/database";
import { useState } from "react";
import BannerHeader from "@/components/Layout/BannerHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { PanelImage } from "@/components/Images/PanelImage";

interface PropType {
    pageContentData: any;
    imagesData: any;
    panelsData: any;
}

export const TheatrePage = ({
    pageContentData,
    imagesData,
    panelsData
}: PropType) => {
    const [content, setContent] = useState(pageContentData);
    const [panels, setPanels] = useState(panelsData);

    let panelIds: Array<string> = [];

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48">

                        <BannerHeader text="Theatre" />

                        <div className="md:grid md:grid-cols-4 gap-x-2 min-h-screen">
                            {content && panels && (
                                panels.map((p, i) => {

                                    if (p != null || undefined) {
                                        const imageNameId = p.split("alt=")[0].split("%2F")[2];
                                        const _imageNameId = imageNameId.replace("%26", "&");
                                        const match = content.find((c) => _imageNameId.includes(c.imageNameId));

                                        if (match && !panelIds.includes(match.imageNameId)) {
                                            panelIds.push(match.imageNameId);

                                            return (
                                                <PanelImage
                                                    key={i}
                                                    src={`/images/theatre/${imagesData[i]}`}
                                                    alt={match.title}
                                                    title={match.title}
                                                    href={"theatre/" + match.id}
                                                    titleClasses="!text-xl !md:text-3xl"
                                                    loadingStrategy="lazy"
                                                />
                                            )
                                        }
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
    const contentData = await getContentBySchemaName("theatre");

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

    const imageIds = [];
    const imageNames = [];
    const panels = [];
    const pageContentData = await contentData.filter(async (d) => {
        if (d?.imageGallery) {
            await d.imageGallery.forEach(async (x) => {
                if (x.hasOwnProperty('mainImage')) {
                    if (!imageIds.includes(d.imageNameId)) {
                        imageIds.push(d.imageNameId);
                        panels.push(x);
                        imageNames.push(x.title)
                    }
                }
            });
        }

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
            imagesData: imageNames,
            panelsData: panelsData
        }
    }
}

export default TheatrePage;