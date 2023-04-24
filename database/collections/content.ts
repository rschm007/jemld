import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from "../firebase";
import { getImageURLsByImageGalleryLength } from "../media";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

/**
 * @description get ALL collections
 * @returns JSON
 */
export const getContent = async () => {
    const contentCol = await collection(firestore, "fl_content")
    const contentSnapshot = await getDocs(contentCol);
    const contentData = contentSnapshot.docs.map((entry) => ({
        id: entry.id,
        ...entry.data()
    }))
    const contentJson = JSON.parse(JSON.stringify(contentData));

    return contentJson;
}

/**
 * @description get ONE collection by ID
 * @param id
 * @returns JSON
 */
export const getContentById = async (id: string) => {
    const contentCol = await collection(firestore, "fl_content", `${id}`)
    const contentSnapshot = await getDocs(contentCol);
    const contentData = contentSnapshot.docs.map((entry) => ({
        id: entry.id,
        ...entry.data()
    }))
    const contentJson = JSON.parse(JSON.stringify(contentData));

    return contentJson;
}

/**
 * @description get ALL collections that match the schema name
 * @param schemaName
 * @returns JSON
 */
export const getContentBySchemaName = async (schemaName: string) => {
    const contentCol = await collection(firestore, "fl_content")
    const contentSnapshot = await getDocs(contentCol);
    const contentData = contentSnapshot.docs.map((entry) => ({
        id: entry.id,
        ...entry.data()
    }))

    let contentFiltered = [];
    contentData.forEach((entry) => {
        // @ts-ignore
        if (entry._fl_meta_.schema === schemaName) {
            contentFiltered.push(entry);
        }
    })

    const contentFilteredPromise = await Promise.all(contentFiltered);
    const contentJson = JSON.parse(JSON.stringify(contentFilteredPromise));
    return contentJson;
}

/**
 * @description get ALL collections that match the schema name
 * @param contentData firestore content object
 * @param id
 * @returns JSON
 */
export const getPageContent = async (contentData: Array<any>, id: string) => {
    let contentMatch = await contentData.find((c) => c.id.toLowerCase() === id.toLowerCase());

    const imageNames = [];
    let imageUrls = [];
    if (contentMatch?.imageGallery) {
        await contentMatch.imageGallery.forEach(async (x) => {
            imageNames.push(x.title)
        })

        await imageNames.forEach(async (x) => {
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
            imageUrls.push(url);
        })
    }

    const images = await Promise.all(imageUrls);

    const content = {
        data: contentMatch,
        imageTitles: imageNames,
        urls: images
    }

    const pageContentJson = JSON.parse(JSON.stringify(content));
    return pageContentJson;
}

/**
 * @description get ALL collections that match the schema name
 * @param contentData firestore content object
 * @param id
 * @returns JSON
 */
export const getProcessPageContent = async (contentData: Array<any>, id: string) => {
    let contentMatch = await contentData.find((c) => c.id.toLowerCase() === id.toLowerCase());

    const imageNames = [];
    let imageUrls = [];
    if (contentMatch?.processFiles) {
        await contentMatch.processFiles.forEach(async (x) => {
            imageNames.push(x.title)
        })

        await imageNames.forEach(async (x) => {
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
            imageUrls.push(url);
        })
    }

    const images = await Promise.all(imageUrls);

    const content = {
        data: contentMatch,
        imageTitles: imageNames,
        urls: images
    }

    const pageContentJson = JSON.parse(JSON.stringify(content));
    return pageContentJson;
}