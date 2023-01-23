import { Image } from "@/@types/Image";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

/**
 * @description GET an image from firebase
 * @param contentData contentData JSON of content data returend from getContent()
 * @returns url
 */
export const getMainImageURLs = async (contentData: any) => {
    const imageNameIds = [];

    contentData.forEach((data) => {
        if (data?.imageNameId) {
            imageNameIds.push(`${data.imageNameId}_0.webp`);
        }
    })

    const imageUrls = [];
    const storage = getStorage();
    imageNameIds.forEach((imageName) => {
        const imageRef = ref(storage, `flamelink/media/${imageName}`)
        const url = getDownloadURL(imageRef).then((res) => {
            return res
        });
        imageUrls.push(url);
    })

    const imageData = await Promise.all(imageUrls);
    return imageData;
}

export const mapImagesMetaData = async (contentData: any, imageUrls: any) => {
    const images: Array<Image> = [];

    imageUrls.forEach((url) => {
        contentData.forEach((data) => {
            if (url.includes(`${data.imageNameId}_0`)) {
                const imageMeta: Image = {
                    title: data.title,
                    url: url,
                    alt: data.title
                }
                images.push(imageMeta);
            }
        })
    })

    return images;
}