import { fl_ImageGalleryImage, fl_Meta } from "./Flamelink"

/**
 * @description generic schema contains most fields for theatre, dance, and film collections
 * 
 */
export type GenericSchema = {
    _fl_meta: fl_Meta;
    clientName: string;
    id: string;
    imageGallery: Array<fl_ImageGalleryImage>;
    imageNameId: string;
    longItemDescription: string;
    mainImage: Array<any>;
    order: number;
    orderNo: number;
    parentId: number;
    shortItemDescription: string;
    title: string;
    year: number;
}