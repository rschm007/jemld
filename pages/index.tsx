import Head from 'next/head'
import { LayoutPrimary } from '@/components'
import { useEffect, useState } from 'react';
import { getTheatre } from '@/database/collections/theatre';
import { getImageURL } from '@/database';
import { BannerImage } from '@/components/Layout/BannerImage';
import { Image } from '@/@types/Image';

interface PropType {
  data: any;
}

export default function Home({
  data
}) {
  const [imgUrls, setImgUrls] = useState<Array<string>>([]);
  const [imgNames, setImgNames] = useState<Array<Image>>([]);

  // get imageNameID paramater from each collection and push to array so we can retrieve image URLs from storage
  let imageNames: Array<Image> = [];
  const getData = async () => {
    await getTheatre()
      .then((response) => {
        response.map((x) => {
          imageNames.push({
            title: x.title,
            imageNameId: `${x.imageNameId}_0.webp`
          });
        })
      }).catch((error) => {
        console.error(error);
      })

    await setImgNames(imageNames);

    // retreive image download URLs
    imageNames.forEach(async (img) => {
      await getImageURL(img.imageNameId)
        .then(async (response) => {
          await setImgUrls((prev) => [
            ...prev, response
          ])
        }).catch((error) => {
          console.error(error);
        })
    })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Head>
        <title>Lighting Design | Jem Designs | California</title>
      </Head>

      <main className="w-screen h-screen">
        <LayoutPrimary>

          <section className="space-y-2 mt-48">
            {imgNames.map((img, i) => (
              <BannerImage
                key={i}
                src={imgUrls[i]}
                alt={img.title}
                title={img.title}
              />
            ))}
          </section>

        </LayoutPrimary>
      </main>
    </>
  )
}