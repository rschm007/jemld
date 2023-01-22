/**
 * @description object for containing data retreived from db for images
 * @param title rendered over image on main page
 * @param url
 * @param alt
 */
export type Image = {
    title: string;
    url: string;
    alt: string;
    data: any;
}