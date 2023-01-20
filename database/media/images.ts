import { getDownloadURL, getStorage, ref } from "firebase/storage";

/**
 * @description GET an image from firebase by fileId
 * @param fileId id field for file
 * @returns url
 */
export const getImage = async (fileName: string) => {
    const storage = getStorage();
    const imageRef = ref(storage, `flamelink/media/${fileName}`)

    let response;

    try {
        response = await getDownloadURL(imageRef);
    } catch (error) {
        return console.error(error);
    }

    // if success return value
    return response ? response : null
}