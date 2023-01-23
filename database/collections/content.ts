import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from "../firebase";

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
    const contentFiltered = contentData.map((entry) => {
        // @ts-ignore
        if (entry._fl_meta_.schema === schemaName) {
            return entry;
        }
    })

    const contentJson = JSON.parse(JSON.stringify(contentFiltered));

    return contentJson;
}