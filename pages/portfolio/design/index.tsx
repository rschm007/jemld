import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent } from '@/database';
import { PanelImage } from '@/components/Images/PanelImage';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

interface PropType {
    dancePanelData: any;
    theatrePanelData: any;
    filmPanelData: any;
    installPanelData: any;
    imagesData: any;
}

export const Design = ({
    dancePanelData,
    theatrePanelData,
    filmPanelData,
    installPanelData,
    imagesData
}: PropType) => {
    const [dancePanel, setDancePanel] = useState(dancePanelData);
    const [theatrePanel, setTheatrePanel] = useState(theatrePanelData);
    const [filmPanel, setFilmPanel] = useState(filmPanelData);
    const [installPanel, setInstallPanel] = useState(installPanelData);
    const [images, setImages] = useState(imagesData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="mt-48 min-h-screen">

                        <BannerHeader text="Design" />

                        <div className="md:grid md:grid-cols-4 gap-x-2">
                            {dancePanel && (
                                <PanelImage
                                    src={images[0]}
                                    alt={dancePanel.altText}
                                    title="Dance"
                                    href="design/dance"
                                />
                            )}

                            {theatrePanel && (
                                <PanelImage
                                    src={images[1]}
                                    alt={theatrePanel.altText}
                                    title="Theatre"
                                    href="design/theatre"
                                />
                            )}

                            {filmPanel && (
                                <PanelImage
                                    src={images[2]}
                                    alt={filmPanel.altText}
                                    title="Film"
                                    href="design/film"
                                />
                            )}

                            {installPanel && (
                                <PanelImage
                                    src={images[3]}
                                    alt={installPanel.altText}
                                    title="Installation & Exhibit"
                                    href="design/installationExhibit"
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
    const contentData = await getContent();
    const danceContentData = [];
    const theatreContentData = [];
    const filmContentData = [];
    const installContentData = [];

    contentData.forEach((x) => {
        if (x._fl_meta_.schema === "dance") {
            danceContentData.push(x);
        } else if (x._fl_meta_.schema === "theatre") {
            theatreContentData.push(x);
        } else if (x._fl_meta_.schema === "film") {
            filmContentData.push(x);
        } else if (x._fl_meta_.schema === "installationExhibit") {
            installContentData.push(x);
        }
    })

    const imageNames = [];

    let dancePanelData = null;
    await danceContentData.filter(async (d) => {
        await d.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainCatImage')) {
                dancePanelData = x;
                imageNames.push(x.title)
            }
        });
    })

    let theatrePanelData = null;
    await theatreContentData.filter(async (d) => {
        await d.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainCatImage')) {
                theatrePanelData = x;
                imageNames.push(x.title)
            }
        });
    })

    let filmPanelData = null;
    await filmContentData.filter(async (d) => {
        await d.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainCatImage')) {
                filmPanelData = x;
                imageNames.push(x.title)
            }
        });
    })

    let installPanelData = null;
    await installContentData.filter(async (d) => {
        await d.imageGallery.forEach(async (x) => {
            if (x.hasOwnProperty('mainCatImage')) {
                installPanelData = x;
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
            dancePanelData: dancePanelData,
            theatrePanelData: theatrePanelData,
            filmPanelData: filmPanelData,
            installPanelData: installPanelData,
            imagesData: imagesData
        }
    }
}

export default Design;