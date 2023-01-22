/**
 * @description GET socialMedia schema content
 * @param contentData JSON of content data returend from getContent()
 * @returns JSONF
 */
export const getSocialMedia = async (contentData: any) => {
    let socialsData = [];
    contentData.forEach(async (content: any) => {
        if (content.hasOwnProperty('platform')) {
            socialsData.push(content);
        }
    });
    const socialsJson = JSON.parse(JSON.stringify(socialsData))

    return socialsJson;
}