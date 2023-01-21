import { collection, getDocs } from "firebase/firestore/lite";
import { firestore } from "../firebase";

export const getSocialMedia = async () => {
    const socialsCol = collection(firestore, "fl_schemas");
    const socialsSnapshot = await getDocs(socialsCol);
    const socialsList = socialsSnapshot.docs.map((doc) => doc.data());

    return socialsList;
}