import { LayoutPrimary } from "@/components";
import { getContentBySchemaName } from "@/database";
import { useState } from "react";
import BannerHeader from "@/components/Layout/BannerHeader";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { PanelImage } from "@/components/Images/PanelImage";

interface PropType {
    pageContentData: any;
    panelsData: any;
}

export const InstallPage = ({
    pageContentData,
    panelsData
}: PropType) => {
    const [content, setContent] = useState(pageContentData);
    const [panels, setPanels] = useState(panelsData);

    console.log(content)

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48">

                        <BannerHeader text="Installation & Exhibit" />

                        <div className="md:grid md:grid-cols-4 gap-x-2 min-h-screen">
                            {content && panels && (
                                content.map((c, i) => {

                                    if (panels[i] != null) {
                                        return (
                                            <PanelImage
                                                key={i}
                                                src={panels[i]}
                                                alt={c.title}
                                                title={c.title}
                                                href={"installationExhibit/" + c.id}
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
    const contentData = await getContentBySchemaName("installationExhibit");

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

export default InstallPage;