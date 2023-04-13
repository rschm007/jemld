import { atomWithStorage } from "jotai/utils";

// design
export const contentAtom = atomWithStorage<Array<any>>('content', []);
export const theatreContentAtom = atomWithStorage<Array<any>>('theatre', []);
export const danceContentAtom = atomWithStorage<Array<any>>('dance', []);
export const filmContentAtom = atomWithStorage<Array<any>>('film', []);
export const installationContentAtom = atomWithStorage<Array<any>>('installation', []);

// drafting
export const lightingDesignContentAtom = atomWithStorage<Array<any>>('lightingDesign', []);
export const scenicDesignContentAtom = atomWithStorage<Array<any>>('scenicDesign', []);

// programming
export const programmingContentAtom = atomWithStorage<Array<any>>('programming', []);

// visualization
export const visualizationContentAtom = atomWithStorage<Array<any>>('visualization', []);