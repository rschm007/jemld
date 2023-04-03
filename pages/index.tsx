import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { getContent, getImagePanelsFromMetaData, getMainImageURLs, mapImagesMetaData } from '@/database';
import { homeImagesAtom } from '@/state';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils'
import { PanelImage } from '@/components/Images/PanelImage';
import { useLayoutEffect, useState } from 'react';

interface PropType {
  imagesMetaData: any;
}

export const Home = ({
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
    const panels = getImagePanelsFromMetaData(imagesMeta);

    console.log(panels)

    setPanels(panels)
  }, [])

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="flex flex-row items-center space-y-2 mt-48">

            {panels.map((img, i) => (
              <PanelImage
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
  const imagesMetaData = await mapImagesMetaData(contentData, imageUrlsData, "design");

  return {
    props: {
      imagesMetaData: imagesMetaData
    }
  }
}

export default Home;