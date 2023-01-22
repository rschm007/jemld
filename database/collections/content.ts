import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from "../firebase";

/**
 * @description get ALL collections
 * @returns <GenericSchema> object
 */
export const getContent = async () => {
    const col = collection(firestore, "fl_content");
    const snapshot = await getDocs(col);
    const list = snapshot.docs.map((doc) => doc.data());

    return list;
}