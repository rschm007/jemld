import { Image } from "@/@types/Image";
import { atomWithStorage } from "jotai/utils";

// home
export const homeImagesAtom = atomWithStorage<Array<Image>>('homeImages', []);
// design index
export const designImagesAtom = atomWithStorage<Array<Image>>('designImages', []);
// drafting index
export const draftingImagesAtom = atomWithStorage<Array<Image>>('draftingImages', []);
// programming index
export const programmingImagesAtom = atomWithStorage<Array<Image>>('programmingImages', []);
