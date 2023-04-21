/**
 * @description object for containing data retreived from db for images
 * @param title rendered over image on main page
 * @param url
 * @param alt
 * @param pageUrl url to dynamic nextjs page route
 * @param orderNo numerical order in which item should be displayed
 */
export type Image = {
    title: string;
    url: string;
    alt: string;
    pageSlug: string;
    orderNo: number;
    category: string;
    subCategory?: string;
    mainImage: boolean;
}