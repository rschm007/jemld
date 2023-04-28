import { LayoutPrimary } from "@/components";
import { getContent, getContentBySchemaName } from "@/database";
import { useState } from "react";
import BannerHeader from "@/components/Layout/BannerHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { PanelImage } from "@/components/Images/PanelImage";

interface PropType {
    pageContentData: any;
    panelsData: any;
}

export const ProcessPage = ({
    pageContentData,
    panelsData
}: PropType) => {
    const [content, setContent] = useState(pageContentData);
    const [panels, setPanels] = useState(panelsData);

    let panelIds = [];

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48">

                        <BannerHeader text="Process" />

                        <div className="md:grid md:grid-cols-4 gap-x-2 min-h-screen">
                            {content && panels && (
                                panels.map((p, i) => {

                                    if (p != null || undefined) {
                                        const imageNameId = p.split("alt=")[0].split("%2F")[2].split("%20")[0];
                                        // const match = content.find((c) => imageNameId.includes(c.processFilesNameId))
                                        const match = content.filter((c) => {
                                            if (c?.processFilesNameId) {

                                                return c.processFilesNameId.includes(imageNameId);
                                            }
                                        })

                                        if (match && !panelIds.includes(match.processFilesNameId)) {
                                            panelIds.push(match.processFilesNameId);

                                            return (
                                                <PanelImage
                                                    key={i}
                                                    src={p}
                                                    alt={match[0].title}
                                                    title={match[0].title}
                                                    href={"process/" + match[0].id}
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
    const contentData = await getContent();

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

    const imageNames = [];

    const processContentData = [];
    await contentData.filter(async (c) => {
        if (c?.processFiles != null || undefined || "" && c?.processFiles.length > 0) {
            await processContentData.push(c);
            c.processFiles.forEach(async (x) => {
                await imageNames.push(x.title);
            })
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
            pageContentData: processContentData,
            panelsData: panelsData
        }
    }
}

export default ProcessPage;