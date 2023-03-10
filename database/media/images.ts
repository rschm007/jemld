import { Image } from "@/@types/Image";
import { stringToCamelcase } from "@/utils";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

/**
 * @description GET an image from firebase
 * @param contentData contentData JSON of content data returend from getContent()
 * @returns url array
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

/**
 * @description GET an image from firebase
 * @param contentData contentData JSON of content data returend from getContent()
 * @param imageNameId field of schema content item
 * @returns url array
 */
export const getImageURLsByImageNameId = async (contentData: any, imageNameId: string) => {
    const imageNameIds = [];
    let imageCount;

    contentData.forEach((data, i) => {
        if (data?.imageNameId === imageNameId) {
            imageNameIds.push(`${data.imageNameId}_[${imageCount}].webp`);
        }
        imageCount++;
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

/**
 * @description GET all image URLs for a particular content item
 * @param imageGalleryLength number
 * @param imageNameId field of content schema item
 * @returns array of URLs
 */
export const getImageURLsByImageGalleryLength = async (imageGalleryLength: number, imageNameId: string) => {
    const imageNameIds = [];

    for (var i = 0; i < imageGalleryLength; i++) {
        imageNameIds.push(`${imageNameId}_${i}.webp`);
    }

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

export const mapImagesMetaData = async (contentData: any, imageUrls: Array<any>) => {
    const images: Array<Image> = [];

    console.log(contentData)

    if (imageUrls.length > 0) {
        imageUrls.forEach((url) => {
            contentData.forEach((data) => {
                if (url?.includes(`${data?.imageNameId}_0`)) {
                    const imageMeta: Image = {
                        title: data.title,
                        url: url,
                        alt: data.title,
                        pageSlug: `${data._fl_meta_.schema}/${stringToCamelcase(data.id)}`,
                        orderNo: data.orderNo
                    }
                    images.push(imageMeta);
                }
            })
        })
    }

    const imagesData = await Promise.all(images);
    return imagesData;
}

/**
 * @description GET profile image from database
 * @returns url
 */
export const getAboutImageUrl = async () => {
    let imageUrl;
    const storage = getStorage();
    const imageRef = ref(storage, `flamelink/media/profile.webp`)
    const url = getDownloadURL(imageRef).then((res) => {
        return res
    });
    imageUrl = url;

    return imageUrl;
}
