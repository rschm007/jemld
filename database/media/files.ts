import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from "../firebase";

export const getFiles = async () => {
    const filesCol = collection(firestore, "fl_files");
    const filesSnapshot = await getDocs(filesCol);
    const filesList = filesSnapshot.docs.map((doc) => doc.data());

    return filesList;
}