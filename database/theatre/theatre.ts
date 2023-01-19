import { collection, getDocs } from "firebase/firestore/lite"
import { firestore } from "../firebase"

// GET all theatre projects
export const getTheatre = async () => {
    const theatreCol = collection(firestore, "theatre");
    const theatreSnapshot = await getDocs(theatreCol);
    const theatreList = theatreSnapshot.docs.map((doc) => doc.data());

    return theatreList;
}
