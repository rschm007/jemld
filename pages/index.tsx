import Head from 'next/head'
import { BannerHeader, LayoutPrimary } from '@/components'
import { getContent, getHomeImagePanelsFromMetaData, getImagePanelsFromMetaData, getMainImageURLs, mapImagesMetaData } from '@/database';
import { homeImagesAtom } from '@/state';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils'
import { PanelImage } from '@/components/Images/PanelImage';
import { useLayoutEffect, useState } from 'react';
import { getRelevantPageSlug } from '@/utils';

interface PropType {
  contentData: any;
  imageUrlsData: any;
  imagesMetaData: any;
}

export const Home = ({
  contentData,
  imageUrlsData,
  imagesMetaData
}: PropType) => {
  //@ts-ignore
  useHydrateAtoms([
    [homeImagesAtom, imagesMetaData]
  ])
  const [imagesMeta] = useAtom(homeImagesAtom);
  const [panels, setPanels] = useState([]);

  // grab first images from each design category for our panel images
  useLayoutEffect(() => {
    if (imagesMeta.length === 0) {
      const panels = getHomeImagePanelsFromMetaData(imagesMetaData);

      setPanels(panels)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="mt-48 min-h-screen">
            {/* <BannerHeader text="Design" /> */}

            <div className="md:grid md:grid-cols-4 gap-x-2 ">
              {panels.map((img, i) => (
                <PanelImage
                  key={i}
                  src={img.url}
                  alt={img.title}
                  title={img.category}
                  href={`portfolio/${img.category}`}
                />
              ))}
            </div>

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

  console.log("////////////////")
  console.log(contentData)
  console.log(imageUrlsData)
  console.log("////////////////")

  return {
    props: {
      contentData: contentData,
      imageUrlsData: imageUrlsData,
      imagesMetaData: imagesMetaData
    }
  }
}

export default Home;