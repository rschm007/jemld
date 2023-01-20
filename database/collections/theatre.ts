import { collection, getDocs } from "firebase/firestore/lite"
import { firestore } from "../firebase"

/**
 * @description get ALL theatre collection
 * @returns <GenericSchema> object
 */
export const getTheatre = async () => {
    const theatreCol = collection(firestore, "fl_content");
    const theatreSnapshot = await getDocs(theatreCol);
    const theatreList = theatreSnapshot.docs.map((doc) => doc.data());

    return theatreList;
}

export const getFiles = async () => {
    const filesCol = collection(firestore, "fl_files");
    const filesSnapshot = await getDocs(filesCol);
    const filesList = filesSnapshot.docs.map((doc) => doc.data());

    return filesList;
}