import Head from 'next/head'
import { firebaseApp, getContent, getMainImageURLs, mapImagesMetaData } from '@/database';
import { useEffect } from 'react';
import { getStorage, ref } from 'firebase/storage';


export const Test = ({
    contentData,
    imageUrlsData,
    imagesMetaData
}) => {

    useEffect(() => {
        const fetchImages = async () => {
            const storage = await getStorage(firebaseApp);
            const imagesRef = ref(storage, 'flamelink/media');

            console.log(imagesRef)

            return imagesRef;
        }

        fetchImages();

    }, [])

    return (
        <>
            <Head>
                <title>Lighting Design | Jem Designs | California</title>
            </Head>

            <main className="w-screen h-screen">
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
            contentData: contentData,
            imagesMetaData: imagesMetaData
        }
    }
}

export default Test;