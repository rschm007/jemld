import { Image } from "@/@types/Image";
import { collection, getDocs } from "firebase/firestore/lite"
import { firestore } from "../firebase"
import { getImageURL } from "../media";

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

/**
 * @description get imageNameID paramater from Theatre collection and push to array so we can retrieve image URLs from storage
 * @returns Array<Image>
 */
export const getTheatreMainImages = async () => {
    let images: Array<any> = [];
    let imageNames: Array<string> = [];
    let imageUrls: Array<any> = [];

    await getTheatre()
        .then(async (response) => {
            await response.map((x) => {
                imageNames.push(`${x.imageNameId}_0.webp`);
            })
        }).catch((error) => {
            console.error(error);
        })

    // retreive image download URLs
    await imageNames.forEach(async (imageName) => {
        await getImageURL(imageName)
            .then(async (response) => {
                await imageUrls.push(response);
            }).catch((error) => {
                console.error(error);
            })
    })

    imageNames.forEach((img, i) => {
        images.push({
            title: img,
            url: imageUrls[i],
            alt: `Photogaph of ${img}`
        })
    })

    return imageUrls;
}