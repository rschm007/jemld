import { BannerHeader, LayoutPrimary } from "@/components";
import { HeroImage } from "@/components/Images";
import { getContentBySchemaName, getPageContent } from "@/database";
import { useRouter } from "next/router"

interface PropType {
    contentData: any;
}

export const TheatreDocPage = ({
    contentData,
}: PropType) => {
    console.log(contentData);

    return (
        <>
            <main className="w-screen h-screen">
                <LayoutPrimary>

                    <section className="space-y-2 mt-48">
                        <HeroImage src={contentData.urls[0]} alt={contentData.data.title} />

                        <BannerHeader text={contentData.data.title} />


                    </section>

                </LayoutPrimary>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const id = context.params.id;

    const contentData = await getContentBySchemaName("theatre");
    const pageContentData = await getPageContent(contentData, id);

    return {
        props: {
            contentData: pageContentData
        }
    }
}

export default TheatreDocPage;