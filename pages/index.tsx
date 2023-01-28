import Head from 'next/head'
import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent, getMainImageURLs, mapImagesMetaData } from '@/database';
import { BannerImage } from '@/components/Images/BannerImage';
import { homeImagesAtom } from '@/state';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils'
import { contentAtom } from '@/state/content';

interface PropType {
  contentData: any;
  imagesMetaData: any;
}

export const Home = ({
  contentData,
  imagesMetaData
}: PropType) => {
  //@ts-ignore
  useHydrateAtoms([
    [contentAtom, contentData],
    [homeImagesAtom, imagesMetaData]
  ])
  const [content] = useAtom(contentAtom);
  const [imagesMeta] = useAtom(homeImagesAtom);

  console.log(imagesMeta)
  console.log(content)
  
  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="space-y-2 mt-48">

            {imagesMeta.sort((a, b) => a.orderNo - b.orderNo).map((img, i) => (
              <BannerImage
                key={i}
                src={img.url}
                alt={img.title}
                title={img.title}
                href={`portfolio/${img.pageSlug}`}
              />
            ))}
          </section>

        </LayoutPrimary>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const contentData = await getContent();
  const imageUrlsData = await getMainImageURLs(contentData);
  const imagesMetaData = await mapImagesMetaData(contentData, imageUrlsData);

  return {
    props: {
      contentData: contentData,
      imagesMetaData: imagesMetaData
    }
  }
}

export default Home;