import _ from "lodash";

export const getPageSlug = (slug: string) => {
    let regex = /[A-Za-z0-9]+\/[A-Za-z0-9]+/;

    return slug.match(regex)[0];
}

export const getImagePanelsFromMetaData = (metadata: Array<any>) => {
    const unique = {};
    const distinct = [];

    metadata.forEach(function (x) {
        const key = getPageSlug(x.pageSlug);

        if (!unique[key]) {
            distinct.push(x);
            unique[key] = true;
        }
    });

    return distinct;
}