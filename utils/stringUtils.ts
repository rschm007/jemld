/**c
 * @param string 
 * @returns camelized string
 */
export const stringToCamelcase = (string: string) => {
    return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

export const getFullPageSlug = (slug: string) => {
    let regex = /[A-Za-z0-9]+\/[A-Za-z0-9]+/;

    return slug.match(regex)[0];
}

export const getRelevantPageSlug = (slug: string) => {
    let regex = /[A-Za-z0-9]+\/[A-Za-z0-9]+/;

    const match = slug.match(regex)[0];
    return match.split("/")[1];
}
