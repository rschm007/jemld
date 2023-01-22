import { getContent } from "./content";

export const getSocialMedia = async () => {
    let socialsArr = [];

    await getContent().then((res) => {
        res.filter((r) => {
            if (r._fl_meta_.schema === "socialMedia") {
                socialsArr.push(r);
            }
        })
    })

    return socialsArr;
}