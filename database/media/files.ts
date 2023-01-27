import { collection, getDocs } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { firestore } from "../firebase";

/**
 * @description GET an image from firebase
 * @returns 
 */
export const getFiles = async () => {
    const filesCol = collection(firestore, "fl_files");
    const filesSnapshot = await getDocs(filesCol);
    const filesList = filesSnapshot.docs.map((doc) => doc.data());

    const filesData = JSON.parse(JSON.stringify(filesList));
    return filesData;
}

type ContentType = "video" | "image"

/**
 * @description GET all files from firebase by name ID
 * @param contentData filesData JSON of content data returend from getFiles()
 * @param nameId field of schema content item
 * @returns url array
 */
export const getFileURLsByNameId = async (
    filesData: any,
    nameId: string,
    contentType: ContentType
) => {
    const fileNameIds = [];
    let filesCount;

    filesData.forEach((data, i) => {
        if (data?.file === nameId) {
            fileNameIds.push(`${data.imageNameId}_[${fileNameIds}].webp`);
        }
        filesCount++;
    })

    const fileUrls = [];
    const storage = getStorage();
    fileNameIds.forEach((fileName) => {
        const fileRef = ref(storage, `flamelink/media/${fileName}`)
        const url = getDownloadURL(fileRef).then((res) => {
            return res
        });
        fileUrls.push(url);
    })

    const _filesData = await Promise.all(fileUrls);
    return _filesData;
}