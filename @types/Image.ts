/**
 * @description object for containing data retreived from db for images
 * @param title rendered over image on main page
 * @param imageNameId key for retrieving with firebase getDownloadUrl()
 */
export type Image = {
    title: string;
    imageNameId: string;
}