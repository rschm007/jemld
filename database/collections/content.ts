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