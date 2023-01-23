import { LayoutPrimary } from "@/components";
import { getContentBySchemaName, getMainImageURLs, mapImagesMetaData } from "@/database";
import { theatreContentAtom } from "@/state/content";
import { useAtom } from "jotai";
import { useRouter } from "next/router"
import { useHydrateAtoms } from 'jotai/utils'

interface PropType {
    contentData: any;
    imagesMetaData: any;
}

export const TheatrePage = ({
    contentData,
    imagesMetaData
}: PropType) => {
    //@ts-ignore
    useHydrateAtoms([
        [theatreContentAtom, contentData]
    ])
    const [content] = useAtom(theatreContentAtom);

    const router = useRouter();
    const id = router.query.id;

    console.log(id)
    console.log(content);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">

                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const id = query;

    const contentData = await getContentBySchemaName("theatre");
    const imageUrlsData = await getMainImageURLs(contentData);
    const imagesMetaData = await mapImagesMetaData(contentData, imageUrlsData);

    return {
        props: {
            contentData: contentData,
        }
    }
}

export default TheatrePage;